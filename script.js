const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav-links');

function closeMenu(){
  nav?.classList.remove('open');
  menuToggle?.setAttribute('aria-expanded','false');
}

menuToggle?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(open));
});

nav?.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
window.addEventListener('resize', () => { if (window.innerWidth > 900) closeMenu(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });
