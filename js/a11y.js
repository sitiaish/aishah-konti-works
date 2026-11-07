/*
 * Accessibility helpers shared by both pages.
 * Links that open a new tab get a hidden " (opens in a new tab)" for screen readers,
 * including links added later by other components.
 */
function mark(a) {
  if (a.querySelector('.nt')) return;
  const s = document.createElement('span');
  s.className = 'sr nt';
  s.textContent = ' (opens in a new tab)';
  a.appendChild(s);
}

export function initA11y() {
  document.querySelectorAll('a[target="_blank"]').forEach(mark);
  new MutationObserver((changes) => changes.forEach((c) => c.addedNodes.forEach((n) => {
    if (n.matches && n.matches('a[target="_blank"]')) mark(n);
    if (n.querySelectorAll) n.querySelectorAll('a[target="_blank"]').forEach(mark);
  }))).observe(document.body, { childList: true, subtree: true });
}
