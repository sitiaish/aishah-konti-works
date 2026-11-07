/*
 * Landing: the "What is a data story?" dropdown.
 * (The fanning stack of screenshots is pure CSS: see css/landing.css.)
 */
export function initLanding() {
  const button = document.getElementById('ds-q');
  const panel = document.getElementById('ds-a');
  if (!button) return;
  button.onclick = () => {
    const open = button.getAttribute('aria-expanded') !== 'true';
    button.setAttribute('aria-expanded', open);
    panel.classList.toggle('open', open);
  };
}
