/*
 * Footer: click the email address to copy it.
 * If the browser blocks copying, the address is selected so it can be copied by hand.
 */
export function initFooter() {
  const button = document.getElementById('cp');
  if (!button) return;
  const email = document.getElementById('em');
  const hint = document.getElementById('cpm');
  button.addEventListener('click', () => {
    const done = () => {
      hint.textContent = 'copied ✓';
      setTimeout(() => (hint.textContent = 'click to copy'), 2000);
    };
    const select = () => {
      const range = document.createRange();
      range.selectNodeContents(email);
      const sel = getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
      hint.textContent = 'selected: press ⌘C or Ctrl+C';
    };
    try { navigator.clipboard.writeText(email.textContent).then(done, select); } catch (e) { select(); }
  });
}
