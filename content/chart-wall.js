/*
 * Chart wall pieces. One entry per visualisation; several screenshots of the same viz go in views.
 *
 * - project:  project ID from projects.csv (gives the title, year, organisation and link).
 * - section:  'maps' | 'charts' | 'illus' | 'delight'
 * - featured: true shows it on the wall. false keeps it saved but hidden.
 * - caption:  what the viz shows, shown when the piece is opened.
 * - views:    images in img/. The first is the tile. Extra views appear as thumbnails in the viewer.
 *             size is the image's width x height in pixels, so the wall doesn't jump while images load.
 *
 * Within each section, pieces are sorted newest first automatically.
 */
export const SECTIONS = [
  { id: 'maps', title: 'Maps', blurb: 'Places and routes, from story maps to whole apps', short: 'Maps' },
  { id: 'charts', title: 'Charts and data visualisations', blurb: 'Bars, bubbles, networks, radials and everything counted', short: 'Charts' },
  { id: 'illus', title: 'Interactive illustrations', blurb: 'Drawings you can click, drag or scroll through', short: 'Illustrations' },
  { id: 'delight', title: 'Misc delighters', blurb: 'Landing pages, micro-animations and other ways to present data', short: 'Delighters' }
];

export const CREDIT = 'Code by Siti Aishah · Design and illustration by Kontinentalist designers';

export const PIECES = [
  {
    project: 'P089',
    section: 'maps',
    featured: true,
    caption: 'Data centres around Singapore, on one map',
    views: [
      {
        image: 'P089-1.jpg',
        size: '1200x832',
        caption: 'Data centres around Singapore, Johor and Batam, sized by megawatts and coloured by home country'
      },
      {
        image: 'P089-2.jpg',
        size: '1200x831',
        caption: 'Data centres by status, with a year slider to 2030'
      }
    ]
  },
  {
    project: 'P088',
    section: 'delight',
    featured: true,
    caption: 'Photo card probability simulator',
    views: [
      { image: 'P088-1.jpg', size: '1200x727', caption: 'Open albums until your photo card turns up' },
      { image: 'P088-2.jpg', size: '1200x707', caption: 'How many albums it took to get your card' },
      { image: 'P088-3.jpg', size: '1200x1145', caption: 'Pick an idol, album version and colour theme' }
    ]
  },
  {
    project: 'P086',
    section: 'maps',
    featured: true,
    caption: 'The A+U Mapazine app',
    views: [
      { image: 'A1.jpg', size: '1600x788', caption: 'Map view with region filter' },
      { image: 'A2.jpg', size: '1600x918', caption: 'Story panel on the map' },
      { image: 'A3.jpg', size: '1600x909', caption: 'Grid view by region' },
      { image: 'A4.jpg', size: '1600x1005', caption: 'Story opened from the grid' }
    ]
  },
  {
    project: 'P083',
    section: 'illus',
    featured: true,
    caption: 'Phase 1: mining and extraction, illustrated',
    views: [
      { image: 'P083-1.jpg', size: '1200x667' }
    ]
  },
  {
    project: 'P083',
    section: 'charts',
    featured: false,
    caption: 'Which energy sources need which minerals',
    views: [
      { image: 'P083-2.jpg', size: '1158x924', caption: 'Minerals needed for wind power' },
      { image: 'P083-3.jpg', size: '1140x930', caption: 'Which energy sources need zinc' }
    ]
  },
  {
    project: 'P078',
    section: 'charts',
    featured: false,
    caption: 'Charts from five years of FinTech in ASEAN',
    views: [
      { image: 'D0.jpg', size: '1800x1273' }
    ]
  },
  {
    project: 'P078',
    section: 'maps',
    featured: false,
    caption: 'Unicorn map and timeline',
    views: [
      { image: 'D1.jpg', size: '1600x1423' }
    ]
  },
  {
    project: 'P078',
    section: 'charts',
    featured: false,
    caption: 'Heatmap with tooltips',
    views: [
      { image: 'D2.jpg', size: '1600x1184' }
    ]
  },
  {
    project: 'P078',
    section: 'charts',
    featured: true,
    caption: 'Funding bubbles by category',
    views: [
      { image: 'D3.jpg', size: '1346x1521' }
    ]
  },
  {
    project: 'P078',
    section: 'charts',
    featured: false,
    caption: 'Clickable roadmap',
    views: [
      { image: 'D4.jpg', size: '1158x1315' }
    ]
  },
  {
    project: 'P076',
    section: 'maps',
    featured: false,
    caption: 'Blocks where each ethnic quota is filled',
    views: [
      { image: 'P076-1.jpg', size: '1200x677' }
    ]
  },
  {
    project: 'P076',
    section: 'illus',
    featured: true,
    caption: 'Who can buy your flat when a quota is hit',
    views: [
      { image: 'P076-2.jpg', size: '1200x594' }
    ]
  },
  {
    project: 'P075',
    section: 'delight',
    featured: true,
    caption: 'Landing page',
    views: [
      { image: 'B1.jpg', size: '1600x851' }
    ]
  },
  {
    project: 'P075',
    section: 'charts',
    featured: true,
    caption: 'Villages depopulated in 1948, in tatreez',
    views: [
      { image: 'B2.jpg', size: '1558x1000' }
    ]
  },
  {
    project: 'P075',
    section: 'charts',
    featured: false,
    caption: 'Destroyed cultural sites, in the Qowara pattern',
    views: [
      { image: 'B3.jpg', size: '1500x1300' }
    ]
  },
  {
    project: 'P075',
    section: 'maps',
    featured: true,
    caption: 'Map of destroyed sites, filtered by region',
    views: [
      { image: 'B4.jpg', size: '1600x1142' }
    ]
  },
  {
    project: 'P075',
    section: 'charts',
    featured: false,
    caption: 'Interviewees across three neighbourhoods',
    views: [
      { image: 'B5.jpg', size: '1600x876' }
    ]
  },
  {
    project: 'P069',
    section: 'charts',
    featured: false,
    caption: 'The ECO-SOLVE dashboard',
    views: [
      { image: 'C1.jpg', size: '1600x1200', caption: 'Dashboard on a tablet' },
      { image: 'C2.jpg', size: '1600x875', caption: 'Landing page' },
      { image: 'C3.jpg', size: '1600x870', caption: 'Content page' },
      { image: 'C4.jpg', size: '1600x554', caption: 'Filters for animal group, country and platform' }
    ]
  },
  {
    project: 'P065',
    section: 'charts',
    featured: false,
    caption: 'Singapore\'s moves to become a carbon trading hub, 2021 to 2023',
    views: [
      { image: 'P065-1.jpg', size: '1200x885' }
    ]
  },
  {
    project: 'P064',
    section: 'illus',
    featured: true,
    caption: 'Traditional houses across Asia, click one to learn more',
    views: [
      { image: 'P064-1.jpg', size: '1200x607' }
    ]
  },
  {
    project: 'P064',
    section: 'charts',
    featured: false,
    caption: 'Feng shui, Tajul Muluk and Vastu Shastra compared',
    views: [
      { image: 'P064-2.jpg', size: '1200x506' }
    ]
  },
  {
    project: 'P064',
    section: 'illus',
    featured: true,
    caption: 'Measuring furniture with the Malay jari system',
    views: [
      { image: 'P064-3.jpg', size: '1200x720' }
    ]
  },
  {
    project: 'P064',
    section: 'delight',
    featured: false,
    caption: 'Title cover',
    views: [
      { image: 'P064-4.jpg', size: '1200x615' }
    ]
  },
  {
    project: 'P056',
    section: 'delight',
    featured: true,
    caption: 'Hourglass cover: is the future made of sand?',
    views: [
      { image: 'P056-1.jpg', size: '1200x1065' }
    ]
  },
  {
    project: 'P056',
    section: 'maps',
    featured: true,
    caption: 'Singapore\'s reclaimed land, by era',
    views: [
      { image: 'P056-2.jpg', size: '1200x620' }
    ]
  },
  {
    project: 'P056',
    section: 'maps',
    featured: false,
    caption: 'Koh Kong\'s beach barrier, by satellite',
    views: [
      { image: 'P056-3.jpg', size: '1200x679' }
    ]
  },
  {
    project: 'P056',
    section: 'illus',
    featured: true,
    caption: 'Land reclamation through binoculars',
    views: [
      { image: 'P056-4.jpg', size: '1200x825', caption: 'Seeing land reclamation through binoculars' },
      { image: 'P056-5.jpg', size: '1200x710', caption: 'An Orang Pulau voice on what was lost' }
    ]
  },
  {
    project: 'P056',
    section: 'delight',
    featured: false,
    caption: 'A city tells us something about its people',
    views: [
      { image: 'P056-6.jpg', size: '1200x1046' }
    ]
  },
  {
    project: 'P053',
    section: 'illus',
    featured: true,
    caption: 'A city with the features women wish for',
    views: [
      { image: 'P053-1.jpg', size: '1200x593' }
    ]
  },
  {
    project: 'P053',
    section: 'delight',
    featured: false,
    caption: 'Title cover of A Woman\'s World',
    views: [
      { image: 'P053-2.jpg', size: '1200x623' }
    ]
  },
  {
    project: 'P053',
    section: 'delight',
    featured: false,
    caption: 'Lyari Girls Café, as comic panels',
    views: [
      { image: 'P053-3.jpg', size: '1200x659' }
    ]
  },
  {
    project: 'P053',
    section: 'delight',
    featured: false,
    caption: 'A wall of quotes on physical problems women face',
    views: [
      { image: 'P053-4.jpg', size: '1200x347' }
    ]
  },
  {
    project: 'P044',
    section: 'charts',
    featured: true,
    caption: 'Immigration detainees, one figure each',
    views: [
      { image: 'P044-1.jpg', size: '1200x644', caption: 'Four ways people end up in detention' },
      {
        image: 'P044-2.jpg',
        size: '1200x717',
        caption: 'Everyone admitted to Castle Peak Bay in 2019, one figure each'
      }
    ]
  },
  {
    project: 'P044',
    section: 'maps',
    featured: false,
    caption: 'Detention locations across Hong Kong',
    views: [
      { image: 'P044-3.jpg', size: '1200x1041' }
    ]
  },
  {
    project: 'P042',
    section: 'delight',
    featured: true,
    caption: 'Chapter 3: Southeast Asia, with comic art',
    views: [
      { image: 'P042-1.jpg', size: '1200x693' }
    ]
  },
  {
    project: 'P042',
    section: 'charts',
    featured: false,
    caption: 'Asian sci-fi works, placed by shared tropes',
    views: [
      { image: 'P042-2.jpg', size: '1200x723' }
    ]
  },
  {
    project: 'P042',
    section: 'illus',
    featured: false,
    caption: 'Click a trope to learn more',
    views: [
      { image: 'P042-3.jpg', size: '1200x923' }
    ]
  },
  {
    project: 'P039',
    section: 'charts',
    featured: false,
    caption: 'How many people fell into poverty, by country',
    views: [
      { image: 'P039-1.jpg', size: '1200x800' }
    ]
  },
  {
    project: 'P039',
    section: 'charts',
    featured: false,
    caption: 'Relief spending, as arcs',
    views: [
      { image: 'P039-2.jpg', size: '1200x607' }
    ]
  },
  {
    project: 'P039',
    section: 'charts',
    featured: false,
    caption: 'Distance to healthcare, as arcs',
    views: [
      { image: 'P039-3.jpg', size: '1200x605' }
    ]
  },
  {
    project: 'P034',
    section: 'charts',
    featured: true,
    caption: 'GCC\'s changing climate, in radial charts',
    views: [
      { image: 'E1.jpg', size: '1600x1066', caption: 'Title page and radial charts' },
      { image: 'E2.jpg', size: '1440x820', caption: 'Doha, winter view' },
      { image: 'E3.jpg', size: '1440x820', caption: 'Variable filters' }
    ]
  },
  {
    project: 'P027',
    section: 'maps',
    featured: false,
    caption: 'ARI\'s research network map',
    views: [
      { image: 'P027-1.jpg', size: '1200x676', caption: 'ARI\'s research network around the world' },
      { image: 'P027-2.jpg', size: '1200x676', caption: 'Project sites, filtered by research theme' },
      { image: 'P027-3.jpg', size: '1200x676', caption: 'A project site up close' }
    ]
  },
  {
    project: 'P028',
    section: 'delight',
    featured: false,
    caption: 'Story cover illustration',
    views: [
      { image: 'P028-1.jpg', size: '1200x625' }
    ]
  },
  {
    project: 'P028',
    section: 'charts',
    featured: false,
    caption: 'Hepatitis C cases by age group',
    views: [
      { image: 'P028-2.jpg', size: '1200x575' }
    ]
  },
  {
    project: 'P028',
    section: 'charts',
    featured: false,
    caption: 'Deaths over time, as stripes',
    views: [
      { image: 'P028-3.jpg', size: '1200x734' }
    ]
  },
  {
    project: 'P026',
    section: 'maps',
    featured: true,
    caption: 'Illicit trade along the Belt and Road map',
    views: [
      { image: 'P026-1.jpg', size: '1200x688', caption: 'Illicit trade routes along the Belt and Road' },
      { image: 'P026-2.jpg', size: '1200x905', caption: 'Rail lines across the world' },
      {
        image: 'P026-3.jpg',
        size: '1200x1138',
        caption: 'Timber trafficking hotspot, with a side panel'
      }
    ]
  },
  {
    project: 'P025',
    section: 'delight',
    featured: true,
    caption: 'Story cover with audio',
    views: [
      { image: 'P025-1.jpg', size: '1200x582' }
    ]
  },
  {
    project: 'P025',
    section: 'maps',
    featured: false,
    caption: 'Singapore\'s wet markets, mapped by number of stalls',
    views: [
      { image: 'P025-2.jpg', size: '1200x686' }
    ]
  },
  {
    project: 'P022',
    section: 'charts',
    featured: false,
    caption: 'What data people would share with insurers, by age and gender',
    views: [
      { image: 'P022-1.jpg', size: '1200x856' }
    ]
  },
  {
    project: 'P022',
    section: 'charts',
    featured: false,
    caption: 'E-wallet use by age and gender, across six countries',
    views: [
      { image: 'P022-2.jpg', size: '1166x1200' }
    ]
  },
  {
    project: 'P019',
    section: 'charts',
    featured: false,
    caption: 'FinTech deals as bubbles, sized by funding',
    views: [
      { image: 'P019-1.jpg', size: '1200x773' }
    ]
  },
  {
    project: 'P020',
    section: 'maps',
    featured: true,
    caption: 'The route map of a refugee boat at sea',
    views: [
      { image: 'F1.jpg', size: '1600x916', caption: 'Time slider and tooltips' },
      { image: 'F2.jpg', size: '1600x920', caption: 'Route drawn on scroll' }
    ]
  },
  {
    project: 'P020',
    section: 'delight',
    featured: true,
    caption: 'Landing page with wave video and sound',
    views: [
      { image: 'F3.jpg', size: '1600x903' }
    ]
  },
  {
    project: 'P020',
    section: 'charts',
    featured: false,
    caption: 'Days at sea',
    views: [
      { image: 'F4.jpg', size: '1600x925' }
    ]
  },
  {
    project: 'P020',
    section: 'charts',
    featured: false,
    caption: 'Journey outcomes',
    views: [
      { image: 'F5.jpg', size: '1264x1188' }
    ]
  },
  {
    project: 'P013',
    section: 'charts',
    featured: false,
    caption: 'Hajj pilgrims over 10 years, domestic and foreign',
    views: [
      { image: 'P013-1.jpg', size: '1200x733' }
    ]
  },
  {
    project: 'P013',
    section: 'maps',
    featured: false,
    caption: 'The Hajj journey, on one scrolling map',
    views: [
      { image: 'P013-2.jpg', size: '1200x595', caption: 'Day of Tarwiyah at Mina, on a 3D map' },
      {
        image: 'P013-3.jpg',
        size: '1200x602',
        caption: 'How the kapal haji sailed from Singapore to Jeddah'
      },
      { image: 'P013-4.jpg', size: '1200x861', caption: 'The Miqat, where pilgrims enter Ihram' }
    ]
  },
  {
    project: 'P011',
    section: 'maps',
    featured: false,
    caption: 'The East Asian–Australasian Flyway map',
    views: [
      { image: 'P011-1.jpg', size: '1200x631', caption: 'The East Asian–Australasian Flyway, mapped' },
      {
        image: 'P011-2.jpg',
        size: '1122x916',
        caption: 'Conservation efforts along the flyway, by type of response'
      }
    ]
  },
  {
    project: 'P012',
    section: 'charts',
    featured: true,
    caption: 'Every shade of pink PM Lee wore, 2013 to 2020',
    views: [
      { image: 'P012-1.jpg', size: '1200x1000' }
    ]
  },
  {
    project: 'P012',
    section: 'charts',
    featured: false,
    caption: 'When PM Lee wore blue, by type of event',
    views: [
      { image: 'P012-2.jpg', size: '1200x1066' }
    ]
  },
  {
    project: 'P010',
    section: 'charts',
    featured: false,
    caption: 'Singapore\'s population by gender, 1920s',
    views: [
      { image: 'P010-1.jpg', size: '1200x702' }
    ]
  },
  {
    project: 'P010',
    section: 'charts',
    featured: false,
    caption: 'Births and deaths a century ago',
    views: [
      { image: 'P010-2.jpg', size: '1200x667' }
    ]
  },
  {
    project: 'P008',
    section: 'charts',
    featured: false,
    caption: 'Cross Island Line route options compared',
    views: [
      { image: 'P008-1.jpg', size: '1200x1140' }
    ]
  },
  {
    project: 'P005',
    section: 'charts',
    featured: true,
    caption: 'Network of every confirmed COVID-19 case',
    views: [
      {
        image: 'P005-1.jpg',
        size: '1200x1077',
        caption: 'Network of confirmed COVID-19 cases, coloured by cluster'
      },
      {
        image: 'P005-2.jpg',
        size: '1145x1200',
        caption: 'Recolour the network by gender, residency, status or transmission'
      }
    ]
  },
  {
    project: 'P006',
    section: 'charts',
    featured: false,
    caption: 'Daily COVID-19 cases against Singapore\'s responses',
    views: [
      { image: 'P006-1.jpg', size: '1200x839' }
    ]
  },
  {
    project: 'P007',
    section: 'illus',
    featured: false,
    caption: 'Which animal did Sang Nila Utama likely see? Filter by features',
    views: [
      { image: 'P007-1.jpg', size: '1200x979' }
    ]
  },
  {
    project: 'P004',
    section: 'charts',
    featured: false,
    caption: 'Every zodiac prediction, sentence by sentence: lucky, unlucky or neutral',
    views: [
      { image: 'P004-1.jpg', size: '1184x1200' }
    ]
  },
  {
    project: 'P004',
    section: 'charts',
    featured: false,
    caption: 'Pick your zodiac to see its love, health and career score',
    views: [
      { image: 'P004-2.jpg', size: '1200x1107' }
    ]
  },
  {
    project: 'P004',
    section: 'charts',
    featured: false,
    caption: 'Forbes\' richest Singaporeans by zodiac and net worth',
    views: [
      { image: 'P004-3.jpg', size: '1200x677' }
    ]
  },
  {
    project: 'P003',
    section: 'charts',
    featured: false,
    caption: 'Orchard Road\'s Christmas light-up dates, 1984 to 2019',
    views: [
      { image: 'P003-1.jpg', size: '1064x1200' }
    ]
  },
  {
    project: 'P002',
    section: 'charts',
    featured: false,
    caption: 'Straits Times headlines with the word \'queue\', one heart each',
    views: [
      { image: 'P002-1.jpg', size: '1200x905' }
    ]
  },
  {
    project: 'P002',
    section: 'charts',
    featured: false,
    caption: 'What people queued for, as a share of all headlines',
    views: [
      { image: 'P002-2.jpg', size: '1200x297' }
    ]
  },
  {
    project: 'P002',
    section: 'charts',
    featured: false,
    caption: 'Things we kept queuing for since 1990, as small multiples',
    views: [
      { image: 'P002-3.jpg', size: '1200x957' }
    ]
  },
  {
    project: 'P001',
    section: 'charts',
    featured: false,
    caption: 'Price of instant noodles against milk and fast food, by country',
    views: [
      { image: 'P001-1.jpg', size: '1200x970' }
    ]
  },
  {
    project: 'P001',
    section: 'charts',
    featured: false,
    caption: 'Top 10 countries by demand for instant noodles',
    views: [
      { image: 'P001-2.jpg', size: '1200x920' }
    ]
  },
  {
    project: 'P001',
    section: 'charts',
    featured: false,
    caption: 'Where each flavour shows up, picked by button',
    views: [
      { image: 'P001-3.jpg', size: '1200x1171' }
    ]
  }
];
