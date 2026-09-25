// Hamburger menu + zvýraznění aktivního odkazu při scrollu
export function initMenu() {
  const toggle = document.querySelector('.nav-toggle');
  const menu = toggle && document.getElementById(toggle.getAttribute('aria-controls'));
  if (!toggle || !menu) return;

  const links = menu.querySelectorAll('.nav__link');

  const setOpen = (open) => {
    menu.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', String(open));
  };

  toggle.addEventListener('click', () => {
    setOpen(toggle.getAttribute('aria-expanded') !== 'true');
  });

  // Klik na odkaz menu zavře
  links.forEach((link) => link.addEventListener('click', () => setOpen(false)));

  // Escape zavře menu a vrátí fokus na tlačítko
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menu.classList.contains('is-open')) {
      setOpen(false);
      toggle.focus();
    }
  });

  initActiveLink(links);
}

function initActiveLink(links) {
  if (!('IntersectionObserver' in window)) return;

  // Mapa id sekce → odkaz v menu
  const linkById = new Map();
  links.forEach((link) => {
    const id = link.getAttribute('href').slice(1);
    const section = document.getElementById(id);
    if (section) linkById.set(id, link);
  });
  if (linkById.size === 0) return;

  const setActive = (id) => {
    links.forEach((link) => link.classList.remove('is-active'));
    linkById.get(id)?.classList.add('is-active');
  };

  // Sekce je aktivní, když protíná vodorovný pruh uprostřed obrazovky
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActive(entry.target.id);
      });
    },
    { rootMargin: '-45% 0px -55% 0px' },
  );

  linkById.forEach((_, id) => observer.observe(document.getElementById(id)));
}
