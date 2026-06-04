(function () {
  var RING_CATEGORIES     = ['ring', 'signet'];
  var CHAIN_CATEGORIES    = ['chain'];
  var BRACELET_CATEGORIES = ['bracelet'];

  var RING_SIZES       = [15, 15.5, 16, 16.5, 17, 17.5, 18, 18.5, 19, 19.5, 20];
  var CHAIN_LENGTHS    = [40, 45, 50, 55, 60, 65];
  var BRACELET_LENGTHS = [15, 16, 17, 18, 19, 20];

  var currentSizes = RING_SIZES;

  var METALS = [
    { id: 'yellow', ru: 'жёлтое золото', ro: 'aur galben', labelKey: 'metal_yellow_gold' },
    { id: 'rose',   ru: 'розовое золото', ro: 'aur roz',   labelKey: 'metal_rose_gold' },
    { id: 'white',  ru: 'белое золото',   ro: 'aur alb',   labelKey: 'metal_white_gold' },
    { id: 'silver', ru: 'серебро',        ro: 'argint',    labelKey: 'metal_silver' },
  ];

  var PURITIES = {
    yellow: ['585', '750'],
    rose:   ['585', '750'],
    white:  ['585', '750'],
    silver: ['925'],
  };

  var overlay     = document.getElementById('add-modal-overlay');
  var modal       = document.getElementById('add-modal');
  var imgEl       = document.getElementById('add-modal-img');
  var titleEl     = document.getElementById('add-modal-title');
  var subtitleEl  = document.getElementById('add-modal-subtitle');
  var metalLabel  = document.getElementById('add-modal-metal-label');
  var purityLabel = document.getElementById('add-modal-purity-label');
  var metalWrap   = document.getElementById('add-modal-metal-options');
  var purityWrap  = document.getElementById('add-modal-purity-options');
  var continueBtn  = document.getElementById('add-modal-continue');
  var ordersBtn    = document.getElementById('add-modal-orders');
  var ordersBtnLabel = document.getElementById('add-modal-orders-label');
  var closeBtn     = document.getElementById('add-modal-close');

  var sizeGroupEl = document.getElementById('add-modal-size-group');
  var sizeLabelEl = document.getElementById('add-modal-size-label');
  var sizeErrorEl = document.getElementById('add-modal-size-error');
  var sizeWrap    = document.getElementById('add-modal-size-options');

  var currentProduct = null;
  var selectedMetal  = 'yellow';
  var selectedPurity = '585';
  var selectedSize   = null;
  var editMode       = false;

  function renderMetalDots() {
    metalWrap.innerHTML = '';
    METALS.forEach(function (metal) {
      var btn = document.createElement('button');
      btn.className = 'add-modal-metal-dot metal-dot--' + metal.id + (metal.id === selectedMetal ? ' active' : '');
      btn.type = 'button';
      btn.setAttribute('aria-label', window.t(metal.labelKey));
      btn.addEventListener('click', function () {
        selectedMetal = metal.id;
        if (PURITIES[selectedMetal].indexOf(selectedPurity) === -1) {
          selectedPurity = PURITIES[selectedMetal][0];
        }
        renderMetalDots();
        renderPurityPills();
      });
      metalWrap.appendChild(btn);
    });
    // update selected name label
    var nameEl = document.getElementById('add-modal-metal-name');
    if (nameEl) {
      var active = METALS.find(function (m) { return m.id === selectedMetal; });
      nameEl.textContent = active ? window.t(active.labelKey) : '';
    }
  }

  function renderPurityPills() {
    purityWrap.innerHTML = '';
    PURITIES[selectedMetal].forEach(function (p) {
      var btn = document.createElement('button');
      btn.className = 'add-modal-pill' + (p === selectedPurity ? ' selected' : '');
      btn.textContent = p;
      btn.type = 'button';
      btn.addEventListener('click', function () {
        selectedPurity = p;
        renderPurityPills();
      });
      purityWrap.appendChild(btn);
    });
  }

  function renderSizePills() {
    sizeWrap.innerHTML = '';
    currentSizes.forEach(function (s) {
      var btn = document.createElement('button');
      btn.className = 'add-modal-pill' + (s === selectedSize ? ' selected' : '');
      btn.textContent = String(s);
      btn.type = 'button';
      btn.addEventListener('click', function () {
        selectedSize = s;
        if (sizeErrorEl) sizeErrorEl.style.display = 'none';
        renderSizePills();
      });
      sizeWrap.appendChild(btn);
    });
  }

  function getSelectedMaterial() {
    var metal = METALS.find(function (m) { return m.id === selectedMetal; });
    return {
      ru: metal.ru + ' ' + selectedPurity,
      ro: metal.ro + ' ' + selectedPurity,
    };
  }

  function updateStaticLabels() {
    subtitleEl.textContent     = window.t('modal_subtitle');
    metalLabel.textContent     = window.t('modal_metal_label');
    purityLabel.textContent    = window.t('modal_purity_label');
    continueBtn.textContent    = window.t('modal_continue_btn');
    ordersBtnLabel.textContent = window.t('modal_orders_btn');
  }

  function openModal(product, options) {
    currentProduct = product;
    editMode = !!(options && options.edit);
    var l = window.currentLang || 'ru';

    imgEl.src = 'https://rqrsmlbrsgmvsfxfthba.supabase.co/storage/v1/object/public/product-images/thumbs/m' + product.id + '.webp';
    imgEl.alt = product.title[l];
    titleEl.textContent = product.title[l];

    selectedMetal  = (options && options.metalId) ? options.metalId : 'yellow';
    selectedPurity = (options && options.purity)  ? options.purity  : '585';
    if (PURITIES[selectedMetal].indexOf(selectedPurity) === -1) {
      selectedPurity = PURITIES[selectedMetal][0];
    }

    var isRing     = RING_CATEGORIES.indexOf(product.category) !== -1;
    var isChain    = CHAIN_CATEGORIES.indexOf(product.category) !== -1;
    var isBracelet = BRACELET_CATEGORIES.indexOf(product.category) !== -1;
    var needsSize  = isRing || isChain || isBracelet;

    currentSizes = isChain ? CHAIN_LENGTHS : (isBracelet ? BRACELET_LENGTHS : RING_SIZES);
    selectedSize = (options && options.size != null) ? options.size : null;
    if (sizeGroupEl) sizeGroupEl.style.display = needsSize ? '' : 'none';
    if (sizeLabelEl) {
      sizeLabelEl.textContent = (isChain || isBracelet)
        ? window.t('modal_length_label')
        : window.t('modal_size_label');
    }

    updateStaticLabels();
    renderMetalDots();
    renderPurityPills();
    if (needsSize) renderSizePills();

    overlay.classList.add('open');
    overlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    setTimeout(function () { modal.focus(); }, 50);
  }

  function closeModal() {
    overlay.classList.remove('open');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  function doAddToCart() {
    if (!currentProduct) return;
    var productCopy = {
      id:       currentProduct.id,
      title:    currentProduct.title,
      type:     currentProduct.type,
      material: getSelectedMaterial(),
      metalId:  selectedMetal,
      purity:   selectedPurity,
      size:     selectedSize,
      stones:   currentProduct.stones,
      category: currentProduct.category,
    };
    if (typeof window.addToCart === 'function') window.addToCart(productCopy);
  }

  function doUpdateCartItem() {
    if (!currentProduct) return;
    if (typeof window.updateCartItem === 'function') {
      window.updateCartItem(currentProduct.id, {
        material: getSelectedMaterial(),
        metalId:  selectedMetal,
        purity:   selectedPurity,
        size:     selectedSize,
      });
    }
  }

  function validateSize() {
    var isRing     = currentProduct && RING_CATEGORIES.indexOf(currentProduct.category) !== -1;
    var isChain    = currentProduct && CHAIN_CATEGORIES.indexOf(currentProduct.category) !== -1;
    var isBracelet = currentProduct && BRACELET_CATEGORIES.indexOf(currentProduct.category) !== -1;
    var needsSize  = isRing || isChain || isBracelet;

    if (needsSize && selectedSize === null) {
      if (sizeErrorEl) {
        sizeErrorEl.textContent = (isChain || isBracelet)
          ? window.t('modal_length_required')
          : window.t('modal_size_required');
        sizeErrorEl.style.display = '';
      }
      return false;
    }
    return true;
  }

  continueBtn.addEventListener('click', function () {
    if (!validateSize()) return;
    if (editMode) { doUpdateCartItem(); } else { doAddToCart(); }
    closeModal();
  });

  ordersBtn.addEventListener('click', function () {
    if (!validateSize()) return;
    if (editMode) {
      doUpdateCartItem();
      closeModal();
    } else {
      doAddToCart();
      closeModal();
      window.location.href = 'checkout.html';
    }
  });

  closeBtn.addEventListener('click', closeModal);

  overlay.addEventListener('click', function (e) {
    if (e.target === overlay) closeModal();
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && overlay.classList.contains('open')) closeModal();
  });

  window.showAddModal = openModal;
})();
