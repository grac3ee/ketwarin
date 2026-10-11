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


// Active section navigation and accessible interactive polish.
const navItems = [...document.querySelectorAll('.nav-links a[href^="#"]')];
const sections = [...document.querySelectorAll('main section[id]')];
const topButton = document.querySelector('.back-to-top');
const updateOnScroll = () => {
  topButton?.classList.toggle('visible', window.scrollY > 550);
  let current = sections[0]?.id;
  for (const section of sections) {
    if (section.getBoundingClientRect().top <= 160) current = section.id;
  }
  navItems.forEach(link => {
    const selected = link.getAttribute('href') === '#' + current;
    link.classList.toggle('active', selected);
    if (selected) link.setAttribute('aria-current','location');
    else link.removeAttribute('aria-current');
  });
};
window.addEventListener('scroll', updateOnScroll, {passive:true});
updateOnScroll();
topButton?.addEventListener('click', () => window.scrollTo({top:0,behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'}));
if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if(entry.isIntersecting){entry.target.classList.add('revealed');observer.unobserve(entry.target);}
  }), {threshold:.07});
  document.querySelectorAll('.project-card,.skill-card,.experience-list article').forEach(element => {
    element.classList.add('reveal-ready');observer.observe(element);
  });
}
