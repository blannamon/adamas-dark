(function () {
  /* ── persistence ────────────────────────── */
  var STORAGE_KEY = 'adamasgold_cart';

  function saveCart() {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(cart)); } catch (e) {}
  }

  function loadCart() {
    try {
      var saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch (e) { return []; }
  }

  /* ── state ─────────────────────────────── */
  var cart = loadCart(); // [{ id, title, type, material, comment }]

  /* ── DOM refs ──────────────────────────── */
  var backdrop   = document.getElementById('cart-backdrop');
  var sidebar    = document.getElementById('cart-sidebar');
  var closeBtn   = document.getElementById('cart-close-btn');
  var itemsWrap  = document.getElementById('cart-items-wrap');
  var emptyState = document.getElementById('cart-empty-state');
  var footerEl   = document.getElementById('cart-sidebar-foot');
  var badge      = document.getElementById('cart-badge');

  /* ── badge ─────────────────────────────── */
  function updateBadge() {
    var count = cart.length;
    badge.textContent = count;
    badge.classList.toggle('visible', count > 0);
  }

  /* ── render items ──────────────────────── */
  function renderItems() {
    var l = window.currentLang || 'ru';
    itemsWrap.innerHTML = '';

    cart.forEach(function (item) {
      var el = document.createElement('div');
      el.className = 'cart-item';
      el.innerHTML =
        '<div class="cart-item-img-wrap">' +
          '<img class="cart-item-img" src="assets/renders/Dark/renders_thumbs/m' + item.id + '.webp" alt="' + item.title[l] + '" loading="lazy">' +
        '</div>' +
        '<div class="cart-item-info">' +
          '<p class="cart-item-title">' + item.title[l] + '</p>' +
          '<p class="cart-item-meta">' + item.type[l] + ' · ' + item.material[l] + '</p>' +
          '<textarea class="cart-item-comment" data-id="' + item.id + '" placeholder="' + window.t('cart_comment_placeholder') + '" rows="2">' + (item.comment || '') + '</textarea>' +
        '</div>' +
        '<button class="cart-item-remove" data-id="' + item.id + '" aria-label="' + window.t('cart_remove_aria') + '">' +
          '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true">' +
            '<path d="M18 6L6 18M6 6l12 12"/>' +
          '</svg>' +
        '</button>';
      itemsWrap.appendChild(el);
    });

    /* comment auto-save */
    itemsWrap.querySelectorAll('.cart-item-comment').forEach(function (ta) {
      ta.addEventListener('input', function () {
        var id = Number(ta.dataset.id);
        var item = cart.find(function (it) { return it.id === id; });
        if (item) { item.comment = ta.value; saveCart(); }
      });
    });

    /* remove buttons */
    itemsWrap.querySelectorAll('.cart-item-remove').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var id = Number(btn.dataset.id);
        cart = cart.filter(function (it) { return it.id !== id; });
        saveCart();
        renderCart();
        if (typeof window.refreshCartButtons === 'function') window.refreshCartButtons();
      });
    });
  }

  /* ── full render ───────────────────────── */
  function renderCart() {
    renderItems();
    var count = cart.length;
    emptyState.style.display = count === 0 ? '' : 'none';
    footerEl.style.display   = count === 0 ? 'none' : '';
    itemsWrap.style.display  = count === 0 ? 'none' : '';

    var titleEl = sidebar.querySelector('.cart-sidebar-title');
    if (titleEl) titleEl.textContent = window.t('cart_title');
    var emptyEl = emptyState.querySelector('p');
    if (emptyEl) emptyEl.textContent = window.t('cart_empty');
    var checkoutBtn = sidebar.querySelector('.btn-cart-checkout');
    if (checkoutBtn) checkoutBtn.textContent = window.t('cart_checkout');

    updateBadge();
  }

  /* ── public API ────────────────────────── */
  window.isInCart = function (id) {
    return !!cart.find(function (it) { return it.id === id; });
  };

  window.addToCart = function (product) {
    if (window.isInCart(product.id)) return;
    cart.push({
      id:       product.id,
      title:    product.title,
      type:     product.type,
      material: product.material,
      comment:  ''
    });
    saveCart();
    renderCart();
    if (typeof window.refreshCartButtons === 'function') window.refreshCartButtons();
  };

  window.removeFromCart = function (id) {
    cart = cart.filter(function (it) { return it.id !== id; });
    saveCart();
    renderCart();
    if (typeof window.refreshCartButtons === 'function') window.refreshCartButtons();
  };

  window.closeCart = function () {
    sidebar.classList.remove('open');
    sidebar.setAttribute('aria-hidden', 'true');
    backdrop.classList.remove('open');
    backdrop.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  /* ── open ──────────────────────────────── */
  function openCart() {
    if (typeof window.closeMobileMenu === 'function') window.closeMobileMenu();
    renderCart();
    sidebar.classList.add('open');
    sidebar.setAttribute('aria-hidden', 'false');
    backdrop.classList.add('open');
    backdrop.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  /* ── event listeners ───────────────────── */
  document.getElementById('header-cart-btn').addEventListener('click', function () {
    if (sidebar.classList.contains('open')) window.closeCart(); else openCart();
  });

  closeBtn.addEventListener('click', window.closeCart);
  backdrop.addEventListener('click', window.closeCart);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && sidebar.classList.contains('open')) window.closeCart();
  });

  /* re-render cart when language switches */
  var _origApply = window.applyTranslations;
  window.applyTranslations = function (lang) {
    _origApply(lang);
    renderCart();
  };

  /* initial paint */
  renderCart();

  /* apply localStorage cart state to catalog buttons already rendered */
  if (typeof window.refreshCartButtons === 'function') window.refreshCartButtons();
})();
