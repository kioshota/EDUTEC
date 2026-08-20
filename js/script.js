const navbar = document.getElementById('navbar');
const burger = document.getElementById('burger');
const mobMenu = document.getElementById('mobMenu');

window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    navbar.classList.add('solid');
  } else {
    navbar.classList.remove('solid');
  }
});

burger.addEventListener('click', () => {
  burger.classList.toggle('open');
  mobMenu.classList.toggle('open');
  burger.setAttribute('aria-expanded', mobMenu.classList.contains('open'));
  document.body.style.overflow = mobMenu.classList.contains('open') ? 'hidden' : '';
});

function closeMob() {
  burger.classList.remove('open');
  mobMenu.classList.remove('open');
  burger.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
}

const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('on');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

reveals.forEach(el => observer.observe(el));

const navLinks = document.querySelectorAll('.nav-links a, .mob-menu a');
const currentPath = window.location.pathname.split('/').pop() || 'index.html';
navLinks.forEach(link => {
  const href = link.getAttribute('href');
  if (href === currentPath) {
    link.classList.add('active');
  }
});

const contentLinks = document.querySelectorAll('.content-nav a');
if (contentLinks.length > 0) {
  const sections = document.querySelectorAll('.content-block');
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        contentLinks.forEach(link => link.classList.remove('active'));
        const id = entry.target.getAttribute('id');
        const activeLink = document.querySelector(`.content-nav a[href="#${id}"]`);
        if (activeLink) activeLink.classList.add('active');
      }
    });
  }, { threshold: 0.4 });
  sections.forEach(s => sectionObserver.observe(s));
}
