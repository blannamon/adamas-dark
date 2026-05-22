(function () {
  var METAL_COLORS = {
    yellow: '#D4AF37',
    rose:   '#C08080',
    white:  '#C8C8C8',
    silver: '#A8A9AD',
  };

  /* ── render items ──────────────────────── */
  function renderCheckoutItems() {
    var cart   = typeof window.getCart === 'function' ? window.getCart() : [];
    var l      = window.currentLang || 'ru';
    var itemsEl  = document.getElementById('checkout-items');
    var countEl  = document.getElementById('checkout-count');
    var gridEl   = document.getElementById('checkout-grid');
    var emptyEl  = document.getElementById('checkout-empty');

    if (!itemsEl) return;

    if (cart.length === 0) {
      if (emptyEl) emptyEl.style.display = '';
      if (gridEl)  gridEl.style.display  = 'none';
      return;
    }

    if (emptyEl) emptyEl.style.display = 'none';
    if (gridEl)  gridEl.style.display  = '';

    if (countEl) {
      var n = cart.length;
      var suffix;
      if (window.currentLang === 'ru') {
        var mod10 = n % 10, mod100 = n % 100;
        if (mod10 === 1 && mod100 !== 11) suffix = window.t('checkout_items_suffix_one');
        else if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) suffix = window.t('checkout_items_suffix_few');
        else suffix = window.t('checkout_items_suffix_many');
      } else {
        suffix = n === 1 ? window.t('checkout_items_suffix_one') : window.t('checkout_items_suffix_few');
      }
      countEl.textContent = '· ' + n + ' ' + suffix;
    }

    itemsEl.innerHTML = '';

    cart.forEach(function (item, idx) {
      var el = document.createElement('div');
      el.className = 'checkout-item';
      el.style.animationDelay = (idx * 0.06) + 's';

      var isLength = item.category === 'chain' || item.category === 'bracelet';
      var sizeHtml = '';
      if (item.size != null) {
        sizeHtml =
          '<span class="checkout-item-size">' +
            window.t(isLength ? 'checkout_length_label' : 'checkout_size_label') +
            ': ' + item.size + (isLength ? ' см' : '') +
          '</span>';
      }

      var metalColor = METAL_COLORS[item.metalId] || METAL_COLORS.yellow;
      var materialText = item.material ? (item.material[l] || item.material.ru || '') : '';

      el.innerHTML =
        '<div class="checkout-item-image">' +
          '<img src="assets/renders/Dark/renders_thumbs/m' + item.id + '.webp"' +
               ' alt="' + (item.title ? item.title[l] : '') + '" loading="lazy">' +
        '</div>' +
        '<div class="checkout-item-body">' +
          '<div class="checkout-item-top">' +
            '<div>' +
              '<p class="checkout-item-type">' + (item.type ? item.type[l] : '') + '</p>' +
              '<h3 class="checkout-item-title">' + (item.title ? item.title[l] : '') + '</h3>' +
            '</div>' +
            '<button class="checkout-item-remove-btn" data-id="' + item.id + '" aria-label="' + window.t('cart_remove_aria') + '">' +
              '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><path d="M18 6L6 18M6 6l12 12"/></svg>' +
            '</button>' +
          '</div>' +
          '<div class="checkout-item-meta">' +
            '<span class="checkout-item-metal">' +
              '<span class="checkout-metal-dot" style="background:' + metalColor + '"></span>' +
              materialText +
            '</span>' +
            sizeHtml +
          '</div>' +
          '<textarea class="checkout-item-comment" data-id="' + item.id + '"' +
                    ' placeholder="' + window.t('cart_comment_placeholder') + '"' +
                    ' rows="2">' + (item.comment || '') + '</textarea>' +
          '<div class="checkout-item-actions">' +
            '<button class="checkout-item-edit-btn" data-id="' + item.id + '">' +
              '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>' +
              '<span data-i18n="checkout_edit_btn">' + window.t('checkout_edit_btn') + '</span>' +
            '</button>' +
          '</div>' +
        '</div>';

      itemsEl.appendChild(el);
    });

    /* comment auto-save */
    itemsEl.querySelectorAll('.checkout-item-comment').forEach(function (ta) {
      ta.addEventListener('input', function () {
        var id = Number(ta.dataset.id);
        if (typeof window.updateCartItemComment === 'function') {
          window.updateCartItemComment(id, ta.value);
        }
      });
    });

    /* remove */
    itemsEl.querySelectorAll('.checkout-item-remove-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var id = Number(btn.dataset.id);
        if (typeof window.removeFromCart === 'function') window.removeFromCart(id);
      });
    });

    /* edit */
    itemsEl.querySelectorAll('.checkout-item-edit-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        openEditModal(Number(btn.dataset.id));
      });
    });
  }

  /* ── open edit modal ───────────────────── */
  function openEditModal(id) {
    var cart = typeof window.getCart === 'function' ? window.getCart() : [];
    var cartItem = cart.find(function (it) { return it.id === id; });
    if (!cartItem) return;

    var product = window.PRODUCTS && window.PRODUCTS.find(function (p) { return p.id === id; });
    if (!product) return;

    /* extract purity from stored field or material string */
    var purity = cartItem.purity;
    if (!purity) {
      var mat = cartItem.material && (cartItem.material.ru || '');
      var m = mat.match(/\d{3}/);
      purity = m ? m[0] : '585';
    }

    if (typeof window.showAddModal === 'function') {
      window.showAddModal(product, {
        metalId: cartItem.metalId || 'yellow',
        purity:  purity,
        size:    cartItem.size,
        edit:    true,
      });
    }
  }

  /* ── form validation & submit ──────────── */
  function validateForm() {
    var ok = true;

    function setError(inputId, errId, msg) {
      var input = document.getElementById(inputId);
      var err   = document.getElementById(errId);
      if (!input || !err) return;
      if (msg) {
        input.classList.add('invalid');
        err.textContent = msg;
        ok = false;
      } else {
        input.classList.remove('invalid');
        err.textContent = '';
      }
    }

    var firstname = (document.getElementById('field-firstname') || {}).value || '';
    var lastname  = (document.getElementById('field-lastname')  || {}).value || '';
    var phone     = (document.getElementById('field-phone')     || {}).value || '';

    setError('field-firstname', 'err-firstname', firstname.trim() ? '' : 'Введите имя');
    setError('field-lastname',  'err-lastname',  lastname.trim()  ? '' : 'Введите фамилию');
    setError('field-phone',     'err-phone',     phone.trim()     ? '' : 'Введите номер телефона');

    return ok;
  }

  function showSuccess() {
    if (typeof window.clearCart === 'function') window.clearCart();
    var overlay = document.getElementById('checkout-success');
    if (overlay) {
      overlay.classList.add('visible');
      overlay.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }
  }

  var form = document.getElementById('checkout-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (validateForm()) showSuccess();
    });
  }

  /* ── cart change callback ──────────────── */
  window.onCartChange = function () {
    renderCheckoutItems();
  };

  /* ── placeholder i18n ──────────────────── */
  function applyPlaceholders() {
    document.querySelectorAll('[data-i18n-placeholder]').forEach(function (el) {
      el.placeholder = window.t(el.dataset.i18nPlaceholder);
    });
  }

  /* ── wrap applyTranslations ────────────── */
  var _origApply = window.applyTranslations;
  window.applyTranslations = function (lang) {
    _origApply(lang);
    applyPlaceholders();
    renderCheckoutItems();
    document.title = window.t('checkout_page_title');
  };

  /* ── info accordion ────────────────────── */
  function initInfoAccordion() {
    var toggle = document.getElementById('checkout-info-toggle');
    var block  = document.getElementById('checkout-info-block');
    if (!toggle || !block) return;

    toggle.addEventListener('click', function () {
      var collapsed = block.classList.toggle('checkout-info-collapsed');
      toggle.setAttribute('aria-expanded', collapsed ? 'false' : 'true');
    });
  }

  /* ── initial render ────────────────────── */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      renderCheckoutItems();
      applyPlaceholders();
      initInfoAccordion();
    });
  } else {
    renderCheckoutItems();
    applyPlaceholders();
    initInfoAccordion();
  }
})();
