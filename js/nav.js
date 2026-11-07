/*
 * Top bar: phone menu drawer, the section you're in, and the bar's height for sticky elements.
 */
export function initNav() {
  initDrawer();
  measureBar();
  initScrollSpy();
}

/* Phone menu: opens over the page; everything behind it is made inert */
function initDrawer() {
  const burger = document.getElementById('burger');
  const drawer = document.getElementById('drawer');
  const scrim = document.getElementById('scrim');
  const close = document.getElementById('drawer-x');
  if (!burger) return;
  const behind = [...document.querySelectorAll('body > *:not(#drawer):not(#scrim):not(script):not(style)')];
  const set = (open) => {
    drawer.hidden = !open;
    scrim.hidden = !open;
    burger.setAttribute('aria-expanded', open);
    document.body.classList.toggle('lock', open);
    behind.forEach((e) => (open ? e.setAttribute('inert', '') : e.removeAttribute('inert')));
    (open ? close : burger).focus();
  };
  burger.onclick = () => set(true);
  close.onclick = () => set(false);
  scrim.onclick = () => set(false);
  drawer.addEventListener('click', (e) => { if (e.target.closest('a')) set(false); });
  addEventListener('keydown', (e) => { if (e.key === 'Escape' && !drawer.hidden) set(false); });
}

/* Measure the real bar height so sticky things sit just under it (sets --navh) */
function measureBar() {
  const nav = document.querySelector('.nav');
  if (!nav) return;
  const set = () => document.documentElement.style.setProperty('--navh', nav.offsetHeight + 'px');
  set();
  addEventListener('resize', set);
}

/* Underline the menu link for the section on screen */
function initScrollSpy() {
  const sections = [['hello', '#hello'], ['story', '#hello'], ['selected', '#selected'], ['fieldnotes', '#fieldnotes'], ['resume', '#resume'], ['contact', '#contact']];
  const links = [...document.querySelectorAll('.nl a, .drawer-links a')];
  let current = '', ticking = false;
  const spy = () => {
    ticking = false;
    const navh = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--navh')) || 66;
    const line = navh + innerHeight * 0.3;
    let href = '#hello';
    for (const [id, h] of sections) {
      const el = document.getElementById(id);
      if (el && el.getBoundingClientRect().top < line) href = h;
    }
    if (innerHeight + scrollY >= document.documentElement.scrollHeight - 4) href = '#contact';
    if (href === current) return;
    current = href;
    links.forEach((a) => (a.getAttribute('href') === href ? a.setAttribute('aria-current', 'true') : a.removeAttribute('aria-current')));
  };
  addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(spy); } }, { passive: true });
  spy();
}
