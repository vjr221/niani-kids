(function () {
  'use strict';

  var root = document.getElementById('nk-home');
  if (!root) return;

  var menuButton = document.getElementById('nk-menu-toggle');
  var nav = document.getElementById('nk-nav');

  if (menuButton && nav) {
    menuButton.addEventListener('click', function () {
      var isOpen = nav.classList.toggle('nk-open');
      menuButton.setAttribute('aria-expanded', String(isOpen));
      menuButton.setAttribute('aria-label', isOpen ? 'Fermer le menu' : 'Ouvrir le menu');
      menuButton.textContent = isOpen ? '✕' : '☰';
    });

    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('nk-open');
        menuButton.setAttribute('aria-expanded', 'false');
        menuButton.setAttribute('aria-label', 'Ouvrir le menu');
        menuButton.textContent = '☰';
      });
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && nav.classList.contains('nk-open')) {
        nav.classList.remove('nk-open');
        menuButton.setAttribute('aria-expanded', 'false');
        menuButton.setAttribute('aria-label', 'Ouvrir le menu');
        menuButton.textContent = '☰';
        menuButton.focus();
      }
    });
  }

  var missions = [
    'Avec un adulte, trouve trois objets jaunes autour de toi. Montre-les, nomme-les et compte-les ensemble.',
    'Frappe doucement dans tes mains trois fois, puis invente un rythme que toute la famille peut répéter.',
    'Observe une plante ou un arbre avec un adulte. Quelles couleurs vois-tu ? Combien de feuilles peux-tu compter ?',
    'Choisis un objet de la maison et décris sa forme, sa couleur et sa texture. Est-il doux, lisse ou rugueux ?',
    'Invente un petit geste pour une émotion : la joie, la surprise ou le calme. Puis demande à quelqu’un de deviner.',
    'Compte cinq pas avec un adulte, puis reviens en marchant comme un éléphant, un oiseau ou un petit chat.',
    'Choisis un mot gentil à dire à quelqu’un aujourd’hui. Un sourire peut aussi être un beau cadeau.'
  ];
  var missionIndex = 0;
  var missionText = document.getElementById('nk-mission-text');
  var missionNumber = document.getElementById('nk-mission-number');
  var missionButton = document.getElementById('nk-new-mission');

  if (missionButton && missionText && missionNumber) {
    missionButton.addEventListener('click', function () {
      missionIndex = (missionIndex + 1) % missions.length;
      missionText.textContent = missions[missionIndex];
      missionNumber.textContent = String(missionIndex + 1).padStart(2, '0');
    });
  }

  var reducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reducedMotion && 'IntersectionObserver' in window) {
    document.documentElement.classList.add('nk-js');
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('nk-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -24px 0px' });

    root.querySelectorAll('.nk-reveal').forEach(function (element) {
      observer.observe(element);
    });
  } else {
    root.querySelectorAll('.nk-reveal').forEach(function (element) {
      element.classList.add('nk-visible');
    });
  }

  var heroArt = document.getElementById('nk-hero-art');
  var heroScene = heroArt && heroArt.querySelector('.nk-hero-scene');
  var canTilt = window.matchMedia && window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  if (heroArt && heroScene && canTilt && !reducedMotion) {
    heroArt.addEventListener('pointermove', function (event) {
      var bounds = heroArt.getBoundingClientRect();
      var x = (event.clientX - bounds.left) / bounds.width;
      var y = (event.clientY - bounds.top) / bounds.height;
      var rotateY = (x - 0.5) * 5;
      var rotateX = (0.5 - y) * 4;
      heroScene.style.transform = 'rotateY(' + (-7 + rotateY) + 'deg) rotateX(' + rotateX + 'deg) rotateZ(1deg)';
    });
    heroArt.addEventListener('pointerleave', function () {
      heroScene.style.transform = '';
    });
  }
}());
