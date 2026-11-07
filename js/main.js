/*
 * Archive page entry point: loads the data, then starts each section.
 * Each section's code lives in its own file in js/.
 */
import { loadProjects, fillCounts } from './data.js';
import { initA11y } from './a11y.js';
import { initNav } from './nav.js';
import { initLanding } from './landing.js';
import { initMarquee } from './marquee.js';
import { initWorks } from './works.js';
import { initStory } from './story/story.js';
import { initFieldnotes } from './fieldnotes.js';
import { initResume } from './resume.js';
import { initFooter } from './footer.js';

initA11y();
initNav();
initLanding();
initMarquee();
initFieldnotes();
initFooter();
const openWork = initWorks();

loadProjects()
  .then((data) => {
    fillCounts(data.counts);
    const goRow = initResume(data);
    initStory(data, { openWork, goRow });
  })
  .catch((err) => {
    console.error(err);
    document.body.insertAdjacentHTML('afterbegin',
      '<p class="load-error">The project list could not load. If you opened this file directly, run a local server instead (see README).</p>');
  });
