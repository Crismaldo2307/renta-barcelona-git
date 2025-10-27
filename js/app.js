document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = navMenu?.querySelectorAll('a');

  if (navToggle && navMenu) {
    const toggleMenu = () => {
      const expanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!expanded));
      navMenu.classList.toggle('open');
      navMenu.style.display = navMenu.classList.contains('open') ? 'flex' : '';
      if (!expanded) {
        navMenu.querySelector('a')?.focus();
      }
    };

    navToggle.addEventListener('click', toggleMenu);

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && navMenu.classList.contains('open')) {
        toggleMenu();
        navToggle.focus();
      }
    });
  }

  if (navLinks) {
    navLinks.forEach((link) => {
      link.addEventListener('click', (event) => {
        const target = (event.target instanceof HTMLAnchorElement) ? event.target : null;
        if (target && target.hash && document.querySelector(target.hash)) {
          event.preventDefault();
          document.querySelector(target.hash)?.scrollIntoView({ behavior: 'smooth' });
          history.replaceState(null, '', target.hash);
        }
        if (navMenu.classList.contains('open')) {
          navMenu.classList.remove('open');
          navMenu.style.display = '';
          navToggle?.setAttribute('aria-expanded', 'false');
        }
      });
    });
  }
});
