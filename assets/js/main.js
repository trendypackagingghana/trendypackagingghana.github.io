(function () {
  'use strict';

  var mobileQuery = window.matchMedia('(max-width: 760px)');

  // ---------- Mobile menu ----------
  var menuBtn = document.querySelector('.menu-btn');
  var mobileNav = document.getElementById('mobile-nav');
  function setMenu(open) {
    if (!menuBtn || !mobileNav) return;
    mobileNav.classList.toggle('open', open);
    menuBtn.setAttribute('aria-expanded', String(open));
    menuBtn.textContent = open ? '×' : '☰';
  }
  if (menuBtn && mobileNav) {
    menuBtn.addEventListener('click', function () {
      setMenu(!mobileNav.classList.contains('open'));
    });
    mobileNav.addEventListener('click', function (e) {
      if (e.target.closest('a')) setMenu(false);
    });
  }

  // ---------- Product filter tabs ----------
  var tabs = document.querySelectorAll('.tab[data-filter]');
  var products = document.querySelectorAll('.product[data-cat]');
  function filterProducts(cat) {
    tabs.forEach(function (t) {
      t.setAttribute('aria-pressed', String(t.dataset.filter === cat));
    });
    products.forEach(function (p) {
      p.hidden = cat !== 'All' && p.dataset.cat !== cat;
    });
  }
  tabs.forEach(function (t) {
    t.addEventListener('click', function () { filterProducts(t.dataset.filter); });
  });
  // Industry links jump to the catalogue with a category pre-selected
  document.querySelectorAll('[data-show-cat]').forEach(function (a) {
    a.addEventListener('click', function () { filterProducts(a.dataset.showCat); });
  });

  // ---------- FAQ: one open at a time; start closed on mobile ----------
  var faqs = document.querySelectorAll('.faq-list details');
  faqs.forEach(function (d) {
    d.addEventListener('toggle', function () {
      if (!d.open) return;
      faqs.forEach(function (o) { if (o !== d) o.open = false; });
    });
  });
  if (mobileQuery.matches) faqs.forEach(function (d) { d.open = false; });

  // ---------- Map: load the heavy Google embed only when asked ----------
  var map = document.querySelector('.map[data-embed]');
  var mapBtn = map && map.querySelector('.map-load');
  if (mapBtn) {
    mapBtn.addEventListener('click', function () {
      var frame = document.createElement('iframe');
      frame.src = map.dataset.embed;
      frame.title = 'Map to Trendy Packaging Ghana, Martey Carpenter Road, Spintex';
      frame.referrerPolicy = 'no-referrer-when-downgrade';
      map.appendChild(frame);
      mapBtn.remove();
    });
  }

  // ---------- Product gallery ----------
  var mainImg = document.querySelector('.gallery-main img');
  var mainSource = document.querySelector('.gallery-main source');
  document.querySelectorAll('.thumb').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var img = btn.querySelector('img');
      var source = btn.querySelector('source');
      if (mainSource && source) mainSource.srcset = source.srcset;
      mainImg.src = img.src;
      mainImg.alt = img.alt;
      document.querySelectorAll('.thumb').forEach(function (b) {
        b.setAttribute('aria-pressed', String(b === btn));
      });
    });
  });

  // ---------- Footer year ----------
  document.querySelectorAll('[data-year]').forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });
})();
