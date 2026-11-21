(function () {
  'use strict';

  var header = document.querySelector('.site-header');
  var progress = document.getElementById('scrollProgress');
  var menuButton = document.getElementById('menuToggle');
  var mobileNav = document.getElementById('mobileNav');

  function updateScrollState() {
    var scrollTop = window.scrollY || document.documentElement.scrollTop;
    var maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    if (header) header.classList.toggle('is-stuck', scrollTop > 24);
    if (progress) progress.style.width = (maxScroll > 0 ? (scrollTop / maxScroll) * 100 : 0) + '%';
  }

  function closeMenu() {
    if (!menuButton || !mobileNav) return;
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Abrir menú');
    mobileNav.setAttribute('aria-hidden', 'true');
    mobileNav.classList.remove('is-open');
    document.body.classList.remove('menu-open');
  }

  if (menuButton && mobileNav) {
    menuButton.addEventListener('click', function () {
      var open = menuButton.getAttribute('aria-expanded') !== 'true';
      menuButton.setAttribute('aria-expanded', String(open));
      menuButton.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
      mobileNav.setAttribute('aria-hidden', String(!open));
      mobileNav.classList.toggle('is-open', open);
      document.body.classList.toggle('menu-open', open);
    });
    mobileNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeMenu);
    });
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') closeMenu();
    });
  }

  var revealItems = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries, currentObserver) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          currentObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -30px 0px' });
    revealItems.forEach(function (item) { observer.observe(item); });
  } else {
    revealItems.forEach(function (item) { item.classList.add('is-visible'); });
  }

  window.addEventListener('scroll', updateScrollState, { passive: true });
  window.addEventListener('resize', updateScrollState);
  updateScrollState();

  var year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());
}());
