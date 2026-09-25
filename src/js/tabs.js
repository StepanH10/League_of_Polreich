// Záložky herních režimů
export function initTabs() {
  const tabs = [...document.querySelectorAll('button[data-tab]')];
  if (tabs.length === 0) return;

  const activate = (tab) => {
    tabs.forEach((t) => {
      const selected = t === tab;
      const panel = document.getElementById(t.getAttribute('aria-controls'));

      t.classList.toggle('is-active', selected);
      t.setAttribute('aria-selected', String(selected));
      t.tabIndex = selected ? 0 : -1;
      if (panel) panel.hidden = !selected;
    });
  };

  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => activate(tab));

    // Šipky mezi záložkami (neaktivní záložky nejsou v pořadí tabulátoru)
    tab.addEventListener('keydown', (e) => {
      const step = { ArrowRight: 1, ArrowLeft: -1 }[e.key];
      if (!step) return;
      e.preventDefault();
      const next = tabs[(index + step + tabs.length) % tabs.length];
      activate(next);
      next.focus();
    });
  });

  // Výchozí stav podle záložky s aria-selected="true"
  activate(tabs.find((t) => t.getAttribute('aria-selected') === 'true') ?? tabs[0]);
}
