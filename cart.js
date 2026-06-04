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
  var cart = loadCart(); // [{ id, title, type, material, metalId, comment }]

  var METAL_COLORS = {
    yellow: '#D4AF37',
    rose:   '#C08080',
    white:  '#C8C8C8',
    silver: '#A8A9AD',
  };

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
          '<img class="cart-item-img" src="https://rqrsmlbrsgmvsfxfthba.supabase.co/storage/v1/object/public/product-images/thumbs/m' + item.id + '.webp" alt="' + item.title[l] + '" loading="lazy">' +
        '</div>' +
        '<div class="cart-item-info">' +
          '<div class="cart-item-title-row">' +
            '<p class="cart-item-title">' + item.title[l] + '</p>' +
            '<button class="cart-item-remove" data-id="' + item.id + '" aria-label="' + window.t('cart_remove_aria') + '">' +
              '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true">' +
                '<path d="M18 6L6 18M6 6l12 12"/>' +
              '</svg>' +
            '</button>' +
          '</div>' +
          '<p class="cart-item-meta">' +
            item.type[l] + ' · ' +
            '<span class="cart-metal-dot" style="background:' + (METAL_COLORS[item.metalId] || METAL_COLORS.yellow) + '"></span>' +
            item.material[l] +
            (item.size != null
              ? ' · ' + (item.category === 'chain' || item.category === 'bracelet'
                  ? '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" style="display:inline-block;vertical-align:-2px"><rect x="2" y="7" width="20" height="10" rx="1"/><path d="M7 7v4M12 7v6M17 7v4"/></svg> '
                  : '⌀ ')
                + item.size
              : '') +
          '</p>' +
          '<textarea class="cart-item-comment" data-id="' + item.id + '" placeholder="' + window.t('cart_comment_placeholder') + '" rows="2">' + (item.comment || '') + '</textarea>' +
        '</div>';
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
    var emptyLink = emptyState.querySelector('.cart-empty-link');
    if (emptyLink) {
      var linkSpan = emptyLink.childNodes[0];
      if (linkSpan && linkSpan.nodeType === 3) linkSpan.textContent = window.t('cart_empty_link') + ' ';
    }
    var checkoutBtn = sidebar.querySelector('.btn-cart-checkout');
    if (checkoutBtn) checkoutBtn.textContent = window.t('cart_checkout');

    updateBadge();
  }

  /* ── public API ────────────────────────── */
  window.isInCart = function (id) {
    return !!cart.find(function (it) { return it.id === id; });
  };

  window.getCart = function () {
    return cart.slice();
  };

  window.addToCart = function (product) {
    if (window.isInCart(product.id)) return;
    cart.push({
      id:       product.id,
      title:    product.title,
      type:     product.type,
      material: product.material,
      metalId:  product.metalId || 'yellow',
      purity:   product.purity  || '585',
      size:     product.size != null ? product.size : null,
      category: product.category || null,
      comment:  ''
    });
    saveCart();
    renderCart();
    if (typeof window.refreshCartButtons === 'function') window.refreshCartButtons();
    if (typeof window.onCartChange === 'function') window.onCartChange();
  };

  window.updateCartItem = function (id, updates) {
    var item = cart.find(function (it) { return it.id === id; });
    if (!item) return;
    if (updates.material !== undefined) item.material = updates.material;
    if (updates.metalId  !== undefined) item.metalId  = updates.metalId;
    if (updates.purity   !== undefined) item.purity   = updates.purity;
    if (updates.size     !== undefined) item.size      = updates.size;
    saveCart();
    renderCart();
    if (typeof window.onCartChange === 'function') window.onCartChange();
  };

  window.updateCartItemComment = function (id, comment) {
    var item = cart.find(function (it) { return it.id === id; });
    if (!item) return;
    item.comment = comment;
    saveCart();
  };

  window.removeFromCart = function (id) {
    cart = cart.filter(function (it) { return it.id !== id; });
    saveCart();
    renderCart();
    if (typeof window.refreshCartButtons === 'function') window.refreshCartButtons();
    if (typeof window.onCartChange === 'function') window.onCartChange();
  };

  window.clearCart = function () {
    cart = [];
    saveCart();
    renderCart();
    if (typeof window.refreshCartButtons === 'function') window.refreshCartButtons();
    if (typeof window.onCartChange === 'function') window.onCartChange();
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

  var emptyLink = document.getElementById('cart-empty-link');
  if (emptyLink) emptyLink.addEventListener('click', window.closeCart);

  var checkoutNavBtn = sidebar.querySelector('.btn-cart-checkout');
  if (checkoutNavBtn) {
    checkoutNavBtn.addEventListener('click', function () {
      window.closeCart();
      window.location.href = 'checkout.html';
    });
  }

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
