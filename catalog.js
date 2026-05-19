(function () {
  const grid         = document.getElementById('products-grid');
  const countEl      = document.getElementById('count');
  const loadMoreBtn  = document.getElementById('btn-load-more');
  const filterBtns   = document.querySelectorAll('.filter-btn');
  const sortSelect   = document.getElementById('sort-select');
  const sortWrap     = document.querySelector('.sort-wrap');
  const sortDropdown = document.getElementById('sort-dropdown');
  const sortOptions  = sortDropdown.querySelectorAll('.sort-option');

  const PER_PAGE = 6;
  let currentCategory = 'all';
  let currentSort     = 'popular';
  let visibleCount    = PER_PAGE;

  function filtered() {
    let items = [...window.PRODUCTS];
    if (currentCategory !== 'all') {
      items = items.filter(p => p.category === currentCategory);
    }
    items.sort((a, b) => b.popular - a.popular);
    return items;
  }

  function parseMaterial(mat) {
    const m = mat.match(/^(.*?)\s*(\d{3,4})\s*$/);
    return m ? { name: m[1], purity: m[2] } : { name: mat, purity: '' };
  }

  function makeCard(p, delay) {
    const l      = window.currentLang || 'ru';
    const inCart = typeof window.isInCart === 'function' && window.isInCart(p.id);
    const card   = document.createElement('article');
    card.className = 'product-card';
    card.tabIndex  = 0;
    card.dataset.productId = p.id;
    card.style.animationDelay = delay + 'ms';
    const mat    = parseMaterial(p.material[l]);
    const puritySpan = mat.purity ? `<span class="meta-mat-purity"> ${mat.purity}</span>` : '';
    card.innerHTML = `
      <div class="card-image-wrap">
        <img class="card-img" src="assets/renders/Dark/renders_thumbs/m${p.id}.webp" alt="${p.type[l]}" loading="lazy">
      </div>
      <div class="card-body">
        <div class="card-info">
          <p class="card-title">${p.title[l]}</p>
          <p class="card-meta"><span class="meta-type">${p.type[l]}</span><span class="meta-sep"> · </span><span class="meta-mat-name">${mat.name}</span>${puritySpan}</p>
          <p class="card-stones">${p.stones[l]}</p>
        </div>
        <div class="card-footer">
          <button class="card-add-btn${inCart ? ' in-cart' : ''}" aria-label="${window.t('cart_add_aria')}">
            <span class="card-add-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
              </svg>
            </span>
            <span class="card-add-label">${inCart ? window.t('cart_in_cart_label') : window.t('cart_add_label')}</span>
          </button>
        </div>
      </div>
    `;

    card.querySelector('.card-add-btn').addEventListener('click', (e) => {
      e.stopPropagation();
      if (typeof window.isInCart === 'function' && window.isInCart(p.id)) {
        if (typeof window.removeFromCart === 'function') window.removeFromCart(p.id);
      } else {
        if (typeof window.addToCart === 'function') window.addToCart(p);
      }
    });

    return card;
  }

  function fixCardMetaOverflow() {
    if (window.innerWidth > 768) return;
    grid.querySelectorAll('.card-meta').forEach(function (el) {
      el.classList.remove('type-only');
      if (el.scrollWidth > el.clientWidth) el.classList.add('type-only');
    });
  }

  function render() {
    const items = filtered();
    countEl.textContent = items.length;
    grid.innerHTML = '';

    const shown = items.slice(0, visibleCount);
    shown.forEach((p, i) => grid.appendChild(makeCard(p, i * 40)));

    loadMoreBtn.style.display = visibleCount >= items.length ? 'none' : '';
    fixCardMetaOverflow();
  }

  /* update existing card buttons without full re-render */
  window.refreshCartButtons = function () {
    grid.querySelectorAll('.product-card').forEach(function (card) {
      var id    = Number(card.dataset.productId);
      var btn   = card.querySelector('.card-add-btn');
      var label = card.querySelector('.card-add-label');
      if (!btn) return;
      var inCart = typeof window.isInCart === 'function' && window.isInCart(id);
      btn.classList.toggle('in-cart', inCart);
      if (label) label.textContent = inCart ? window.t('cart_in_cart_label') : window.t('cart_add_label');
    });
  };

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentCategory = btn.dataset.category;
      visibleCount    = PER_PAGE;
      render();
    });
  });

  sortSelect.addEventListener('change', () => {
    currentSort  = sortSelect.value;
    visibleCount = PER_PAGE;
    render();
  });

  /* custom dropdown */
  function closeSortDropdown() {
    sortWrap.classList.remove('open');
    sortDropdown.classList.remove('open');
  }

  sortWrap.addEventListener('click', (e) => {
    if (e.target.closest('.sort-option')) return;
    sortWrap.classList.toggle('open');
    sortDropdown.classList.toggle('open');
  });

  sortOptions.forEach(option => {
    option.addEventListener('click', () => {
      sortOptions.forEach(o => o.classList.remove('selected'));
      option.classList.add('selected');
      sortSelect.value = option.dataset.value;
      sortSelect.dispatchEvent(new Event('change'));
      closeSortDropdown();
    });
  });

  document.addEventListener('click', (e) => {
    if (!sortWrap.contains(e.target)) closeSortDropdown();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeSortDropdown();
  });

  loadMoreBtn.addEventListener('click', () => {
    visibleCount += PER_PAGE;
    render();
  });

  window.renderCatalog = render;

  render();
})();
