// Aktuální rok v patičce
export function initFooter() {
  const year = document.getElementById('rok');
  if (!year) return;

  year.textContent = String(new Date().getFullYear());
}
