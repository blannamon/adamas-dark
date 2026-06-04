(function () {
  /* ── find product from URL ─────────────── */
  var params    = new URLSearchParams(window.location.search);
  var productId = Number(params.get('id'));
  var product   = (window.PRODUCTS || []).find(function (p) { return p.id === productId; });

  if (!product) {
    window.addEventListener('productsReady', function () {
      product = (window.PRODUCTS || []).find(function (p) { return p.id === productId; });
      if (!product) { window.location.href = 'index.html'; } else { init(); }
    }, { once: true });
    return;
  }

  function init() {
  // TODO (Supabase): update baseUrl to production domain and pageUrl format when routing changes
  var baseUrl = 'https://adamasdark.netlify.app';
  var pageUrl = baseUrl + '/product.html?id=' + product.id;

  /* ── canonical ─────────────────────────── */
  (function () {
    var link = document.createElement('link');
    link.rel  = 'canonical';
    link.href = pageUrl;
    document.head.appendChild(link);
  }());

  /* ── breadcrumb schema ──────────────────── */
  // TODO (Supabase): update catalog item URL from /catalog when route is live
  (function () {
    var s = document.createElement('script');
    s.type        = 'application/ld+json';
    s.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'AdamasGold', item: baseUrl },
        { '@type': 'ListItem', position: 2, name: 'Каталог',    item: baseUrl + '/catalog' },
        { '@type': 'ListItem', position: 3, name: product.title.ru, item: pageUrl }
      ]
    });
    document.head.appendChild(s);
  }());

  /* ── helpers ───────────────────────────── */
  function setText(id, val) {
    var el = document.getElementById(id);
    if (el) el.textContent = val;
  }

  function setMeta(name, content) {
    var el = document.querySelector('meta[name="' + name + '"]');
    if (!el) { el = document.createElement('meta'); el.name = name; document.head.appendChild(el); }
    el.content = content;
  }

  function setOg(prop, content) {
    var el = document.querySelector('meta[property="' + prop + '"]');
    if (!el) { el = document.createElement('meta'); el.setAttribute('property', prop); document.head.appendChild(el); }
    el.content = content;
  }

  /* ── render product info ───────────────── */
  function renderProduct() {
    var l   = window.currentLang || 'ru';
    var _sb = 'https://rqrsmlbrsgmvsfxfthba.supabase.co/storage/v1/object/public/product-images/thumbs/';
    var imgPath = _sb + 'm' + product.id + '.webp';
    var photoCandidates = [
      imgPath,
      _sb + 'm' + product.id + '-2.webp',
      _sb + 'm' + product.id + '-3.webp',
      _sb + 'm' + product.id + '-4.webp',
    ];

    document.title = 'AdamasGold — ' + product.title[l];

    /* ── seo meta + og ──────────────────────── */
    var descSuffix = l === 'ro'
      ? 'Fabricat la comandă — alegeți metalul, mărimea și pietrele.'
      : 'Изготовление на заказ — выберите металл, размер и камни.';
    var metaDesc = product.type[l] + ' ' + product.stones[l] + '. ' + descSuffix;
    setMeta('description', metaDesc);
    setOg('og:title',       'AdamasGold — ' + product.title[l]);
    setOg('og:description', metaDesc);
    setOg('og:image',       'https://rqrsmlbrsgmvsfxfthba.supabase.co/storage/v1/object/public/product-images/thumbs/m' + product.id + '.webp');
    setOg('og:url',         pageUrl);
    setOg('og:type',        'product');

    setText('breadcrumb-category', product.type[l]);
    setText('breadcrumb-product',  product.title[l]);
    setText('product-category-tag', product.type[l]);
    setText('product-title',        product.title[l]);

    var mainImg = document.getElementById('gallery-main-img');
    if (mainImg) { mainImg.src = imgPath; mainImg.alt = product.type[l]; }

    document.querySelectorAll('.gallery-thumb').forEach(function (thumb, i) {
      var imgEl = thumb.querySelector('.gallery-thumb-img');
      if (!photoCandidates[i]) { thumb.style.display = 'none'; return; }
      imgEl.alt = product.type[l];
      imgEl.src = photoCandidates[i];
      imgEl.onerror = function () {
        thumb.style.display = 'none';
        imgEl.onerror = null;
      };
      imgEl.onload = function () {
        thumb.style.display = '';
        imgEl.onload = null;
      };
    });

    setText('spec-type',       product.id);
    setText('spec-stones',     product.stones[l]);
    setText('tab-spec-type',   product.id);
    setText('tab-spec-stones', product.stones[l]);

    updateCartButton();
  }

  /* ── cart button ───────────────────────── */
  function updateCartButton() {
    var btn    = document.getElementById('btn-add-to-cart');
    if (!btn) return;
    var inCart = typeof window.isInCart === 'function' && window.isInCart(product.id);
    btn.classList.toggle('in-cart', inCart);
    var label  = btn.querySelector('.btn-cart-label');
    if (label) label.textContent = inCart ? window.t('cart_in_cart_label') : window.t('cart_add_label');
  }

  var addBtn = document.getElementById('btn-add-to-cart');
  if (addBtn) {
    addBtn.addEventListener('click', function () {
      if (typeof window.isInCart === 'function' && window.isInCart(product.id)) {
        if (typeof window.removeFromCart === 'function') window.removeFromCart(product.id);
        updateCartButton();
      } else {
        if (typeof window.showAddModal === 'function') {
          var metalKeyMap = {
            metal_yellow_gold: 'yellow',
            metal_rose_gold:   'rose',
            metal_white_gold:  'white',
            metal_silver:      'silver',
          };
          var activeDot  = document.querySelector('.metal-swatch-dot.active');
          var metalKey   = activeDot ? activeDot.dataset.metalKey : 'metal_yellow_gold';
          var metalId    = metalKeyMap[metalKey] || 'yellow';
          var isSilver   = metalId === 'silver';
          var trigVal    = document.getElementById('purity-trigger-value');
          var purity     = isSilver ? '925' : (trigVal ? trigVal.textContent.trim() : '585');
          window.showAddModal(product, { metalId: metalId, purity: purity, size: selectedSize });
        }
      }
    });
  }

  /* ── tabs ──────────────────────────────── */
  var tabBtns   = document.querySelectorAll('.tab-btn');
  var tabPanels = document.querySelectorAll('.tab-panel');

  tabBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      tabBtns.forEach(function (b) {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      tabPanels.forEach(function (p) { p.classList.remove('active'); });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');
      var panel = document.getElementById(btn.dataset.tab);
      if (panel) panel.classList.add('active');
    });
  });

  /* ── gallery thumbnails ────────────────── */
  var thumbEls = document.querySelectorAll('.gallery-thumb');
  var mainImg  = document.getElementById('gallery-main-img');

  thumbEls.forEach(function (thumb) {
    thumb.addEventListener('click', function () {
      thumbEls.forEach(function (t) { t.classList.remove('active'); });
      thumb.classList.add('active');
      if (mainImg) {
        mainImg.style.opacity   = '0';
        mainImg.style.transform = 'scale(0.97)';
        setTimeout(function () {
          mainImg.src             = thumb.querySelector('.gallery-thumb-img').src;
          mainImg.style.opacity   = '1';
          mainImg.style.transform = '';
        }, 185);
      }
    });
  });

  /* ── related products ──────────────────── */
  function renderRelated() {
    var l    = window.currentLang || 'ru';
    var grid = document.getElementById('related-grid');
    if (!grid) return;

    var same = (window.PRODUCTS || []).filter(function (p) {
      return p.id !== product.id && p.category === product.category;
    }).slice(0, 3);

    var need   = 3 - same.length;
    var others = need > 0
      ? (window.PRODUCTS || []).filter(function (p) {
          return p.id !== product.id && p.category !== product.category;
        }).slice(0, need)
      : [];

    var items = same.concat(others);
    grid.innerHTML = '';

    items.forEach(function (p, i) {
      var inCart = typeof window.isInCart === 'function' && window.isInCart(p.id);

      var card = document.createElement('article');
      card.className         = 'product-card';
      card.tabIndex          = 0;
      card.dataset.productId = p.id;
      card.style.animationDelay = (i * 60) + 'ms';

      card.innerHTML =
        '<div class="card-image-wrap">' +
          '<img class="card-img" src="https://rqrsmlbrsgmvsfxfthba.supabase.co/storage/v1/object/public/product-images/thumbs/m' + p.id + '.webp" alt="' + p.type[l] + '" loading="lazy">' +
        '</div>' +
        '<div class="card-body">' +
          '<div class="card-info">' +
            '<p class="card-title">' + p.title[l] + '</p>' +
            '<p class="card-meta"><span class="meta-type">' + p.type[l] + '</span></p>' +
            '<p class="card-stones">' + p.stones[l] + '</p>' +
          '</div>' +
          '<div class="card-footer">' +
            '<button class="card-add-btn' + (inCart ? ' in-cart' : '') + '" aria-label="' + window.t('cart_add_aria') + '" data-tooltip="' + (inCart ? window.t('cart_remove_tooltip') : window.t('cart_add_aria')) + '">' +
              '<span class="card-add-label">' + (inCart ? window.t('cart_in_cart_label') : window.t('cart_add_label')) + '</span>' +
              '<span class="card-add-icon">' +
                '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
                  '<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>' +
                '</svg>' +
              '</span>' +
            '</button>' +
          '</div>' +
        '</div>';

      card.querySelector('.card-add-btn').addEventListener('click', function (e) {
        e.stopPropagation();
        if (typeof window.isInCart === 'function' && window.isInCart(p.id)) {
          if (typeof window.removeFromCart === 'function') window.removeFromCart(p.id);
        } else {
          if (typeof window.addToCart === 'function') window.addToCart(p);
        }
        refreshRelatedCartButtons();
      });

      card.addEventListener('click', function () {
        window.location.href = 'product.html?id=' + p.id;
      });

      card.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          window.location.href = 'product.html?id=' + p.id;
        }
      });

      grid.appendChild(card);
    });
  }

  function refreshRelatedCartButtons() {
    document.querySelectorAll('#related-grid .product-card').forEach(function (card) {
      var id     = Number(card.dataset.productId);
      var btn    = card.querySelector('.card-add-btn');
      var label  = card.querySelector('.card-add-label');
      if (!btn) return;
      var inCart = typeof window.isInCart === 'function' && window.isInCart(id);
      btn.classList.toggle('in-cart', inCart);
      btn.dataset.tooltip = inCart ? window.t('cart_remove_tooltip') : window.t('cart_add_aria');
      if (label) label.textContent = inCart ? window.t('cart_in_cart_label') : window.t('cart_add_label');
    });
  }

  /* ── metal swatches ────────────────────── */
  var metalDots   = document.querySelectorAll('.metal-swatch-dot');
  var metalNameEl = document.getElementById('metal-selected-name');

  function updateMetalLabel() {
    var activeDot = document.querySelector('.metal-swatch-dot.active');
    if (activeDot && metalNameEl) {
      metalNameEl.textContent = window.t(activeDot.dataset.metalKey);
    }
  }

  metalDots.forEach(function (dot) {
    dot.addEventListener('click', function () {
      metalDots.forEach(function (d) { d.classList.remove('active'); });
      dot.classList.add('active');
      updateMetalLabel();
      updatePurityDisplay(dot.dataset.metalKey);
    });
  });

  /* ── purity dropdown ───────────────────── */
  var purityStaticEl = document.getElementById('spec-purity');
  var purityDropWrap = document.getElementById('purity-dropdown-wrap');
  var purityTriggerEl = document.getElementById('purity-trigger');
  var purityTrigVal   = document.getElementById('purity-trigger-value');
  var purityMenuEl    = document.getElementById('purity-menu');
  var purityOpts      = document.querySelectorAll('.purity-option');

  function closePurityMenu() {
    if (!purityMenuEl) return;
    purityMenuEl.classList.remove('open');
    if (purityTriggerEl) purityTriggerEl.setAttribute('aria-expanded', 'false');
  }

  function openPurityMenu() {
    if (!purityMenuEl) return;
    purityMenuEl.classList.add('open');
    if (purityTriggerEl) purityTriggerEl.setAttribute('aria-expanded', 'true');
  }

  function updatePurityDisplay(metalKey) {
    var isSilver = metalKey === 'metal_silver';
    if (purityStaticEl) purityStaticEl.style.display = isSilver ? '' : 'none';
    if (purityDropWrap) purityDropWrap.style.display  = isSilver ? 'none' : '';
    if (isSilver) closePurityMenu();
  }

  if (purityTriggerEl) {
    purityTriggerEl.addEventListener('click', function (e) {
      e.stopPropagation();
      purityMenuEl.classList.contains('open') ? closePurityMenu() : openPurityMenu();
    });

    purityTriggerEl.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') { closePurityMenu(); return; }
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        purityMenuEl.classList.contains('open') ? closePurityMenu() : openPurityMenu();
      }
    });
  }

  purityOpts.forEach(function (opt) {
    opt.addEventListener('click', function () {
      purityOpts.forEach(function (o) { o.classList.remove('purity-option--selected'); });
      opt.classList.add('purity-option--selected');
      if (purityTrigVal) purityTrigVal.textContent = opt.dataset.value;
      closePurityMenu();
    });
  });

  document.addEventListener('click', function (e) {
    if (purityDropWrap && !purityDropWrap.contains(e.target)) closePurityMenu();
  });

  /* initialize based on currently active swatch */
  (function () {
    var activeDot = document.querySelector('.metal-swatch-dot.active');
    updatePurityDisplay(activeDot ? activeDot.dataset.metalKey : 'metal_yellow_gold');
  }());

  /* ── size / length selector ────────────── */
  var RING_CATEGORIES     = ['ring', 'signet'];
  var CHAIN_CATEGORIES    = ['chain'];
  var BRACELET_CATEGORIES = ['bracelet'];

  var RING_SIZES       = [15, 15.5, 16, 16.5, 17, 17.5, 18, 18.5, 19, 19.5, 20];
  var CHAIN_LENGTHS    = [40, 45, 50, 55, 60, 65];
  var BRACELET_LENGTHS = [15, 16, 17, 18, 19, 20];

  var selectedSize = null;

  (function () {
    var isRing     = RING_CATEGORIES.indexOf(product.category) !== -1;
    var isChain    = CHAIN_CATEGORIES.indexOf(product.category) !== -1;
    var isBracelet = BRACELET_CATEGORIES.indexOf(product.category) !== -1;

    if (!isRing && !isChain && !isBracelet) return;

    var sizes    = isChain ? CHAIN_LENGTHS : (isBracelet ? BRACELET_LENGTHS : RING_SIZES);
    var labelKey = (isChain || isBracelet) ? 'product_spec_length' : 'product_spec_size';

    var sizeRow   = document.getElementById('spec-size-row');
    var sizeLabel = sizeRow ? sizeRow.querySelector('.spec-label') : null;
    var sizeWrap  = document.getElementById('size-pills-wrap');
    if (!sizeRow || !sizeWrap) return;

    sizeRow.style.display = '';
    if (sizeLabel) {
      sizeLabel.dataset.i18n = labelKey;
      sizeLabel.textContent  = window.t(labelKey);
    }

    function renderSizePills() {
      sizeWrap.innerHTML = '';
      sizes.forEach(function (s) {
        var btn = document.createElement('button');
        btn.type      = 'button';
        btn.className = 'size-pill' + (s === selectedSize ? ' selected' : '');
        btn.textContent = String(s);
        btn.addEventListener('click', function () {
          selectedSize = s;
          renderSizePills();
        });
        sizeWrap.appendChild(btn);
      });
    }

    renderSizePills();
  }());

  /* ── hook into applyTranslations ───────── */
  var _origApply = window.applyTranslations;
  window.applyTranslations = function (lang) {
    _origApply(lang);
    renderProduct();
    renderRelated();
    updateMetalLabel();
  };

  /* ── refreshCartButtons for product page ── */
  window.refreshCartButtons = function () {
    updateCartButton();
    refreshRelatedCartButtons();
  };

  /* ── initial render ────────────────────── */
  renderProduct();
  renderRelated();
  updateMetalLabel();
  } // end init()

  init();
})();
