(function () {
  var btn     = document.getElementById('mobile-menu-btn');
  var overlay = document.getElementById('mobile-nav-overlay');
  var header  = document.querySelector('.site-header');

  if (!btn || !overlay) return;

  function openMenu() {
    if (typeof window.closeCart === 'function') window.closeCart();
    btn.classList.add('open');
    btn.setAttribute('aria-expanded', 'true');
    overlay.classList.add('open');
    overlay.setAttribute('aria-hidden', 'false');
    if (header) header.classList.add('menu-open');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    btn.classList.remove('open');
    btn.setAttribute('aria-expanded', 'false');
    overlay.classList.remove('open');
    overlay.setAttribute('aria-hidden', 'true');
    if (header) header.classList.remove('menu-open');
    document.body.style.overflow = '';
  }

  window.closeMobileMenu = closeMenu;

  btn.addEventListener('click', function () {
    if (btn.classList.contains('open')) closeMenu(); else openMenu();
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && btn.classList.contains('open')) closeMenu();
  });

  overlay.querySelectorAll('.mobile-nav-link').forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });
})();

// Footer accordions
(function () {
  document.querySelectorAll('.footer-accordion .footer-accordion-trigger').forEach(function (trigger) {
    trigger.addEventListener('click', function () {
      trigger.closest('.footer-accordion').classList.toggle('open');
    });
  });
})();
