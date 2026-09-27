(function () {
  'use strict';

  // Theme toggle
  var root = document.documentElement;
  var themeButtons = document.querySelectorAll('#themeToggle');

  function setTheme(theme) {
    root.setAttribute('data-theme', theme);
    try { localStorage.setItem('theme', theme); } catch (e) {}
  }

  themeButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var current = root.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
      setTheme(current === 'light' ? 'dark' : 'light');
    });
  });

  // Mobile nav toggle
  var navToggle = document.getElementById('navToggle');
  var navLinks = document.getElementById('navLinks');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function () {
      var open = navLinks.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navLinks.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Contact obfuscation: assembled at runtime so it never sits as
  // plain text/mailto in the page source for scrapers to harvest.
  function renderEmail(el) {
    if (!el) return;
    var user = el.getAttribute('data-user');
    var domain = el.getAttribute('data-domain');
    if (!user || !domain) return;
    var address = user + '@' + domain;
    var link = document.createElement('a');
    link.href = 'mailto:' + address;
    link.textContent = address;
    link.rel = 'nofollow';
    el.textContent = '';
    el.appendChild(link);
  }

  function renderPhone(el) {
    if (!el) return;
    var p1 = el.getAttribute('data-p1');
    var p2 = el.getAttribute('data-p2');
    var p3 = el.getAttribute('data-p3');
    if (!p1 || !p2 || !p3) return;
    el.textContent = p1 + '.' + p2 + '.' + p3;
  }

  renderEmail(document.getElementById('contactEmail'));
  renderEmail(document.getElementById('resumeEmail'));
  renderPhone(document.getElementById('resumePhone'));

  // Print button on the resume page
  var printBtn = document.getElementById('printBtn');
  if (printBtn) {
    printBtn.addEventListener('click', function () {
      window.print();
    });
  }

  // Footer year
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
