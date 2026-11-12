/*
 * Theme toggle (both pages). Light by default; the system setting is ignored.
 * The inline script at the top of each <head> applies the saved choice before the page paints.
 */
export function initTheme() {
  const btn = document.getElementById('theme-t');
  if (!btn) return;
  const root = document.documentElement;
  const sync = () => {
    const dark = root.dataset.theme === 'dark';
    btn.setAttribute('aria-pressed', dark);
    btn.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode');
  };
  btn.addEventListener('click', () => {
    root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
    try {
      localStorage.setItem('theme', root.dataset.theme);
    } catch {
      /* private mode: just don't remember */
    }
    sync();
  });
  sync();
}
