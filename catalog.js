(function () {
  const grid          = document.getElementById('products-grid');
  const countEl       = document.getElementById('count');
  const paginationEl  = document.getElementById('catalog-pagination');
  const filterBtns    = document.querySelectorAll('.filter-btn');
  const sortSelect    = document.getElementById('sort-select');
  const sortWrap      = document.querySelector('.sort-wrap');
  const sortDropdown  = document.getElementById('sort-dropdown');
  const sortOptions   = sortDropdown.querySelectorAll('.sort-option');

  function getPerPage() { return window.innerWidth < 768 ? 8 : 9; }
  let currentCategory = 'all';
  let currentSort     = 'popular_desc';
  let currentPage     = 1;

  function filtered() {
    let items = [...window.PRODUCTS];
    if (currentCategory !== 'all') {
      items = items.filter(p => p.category === currentCategory);
    }
    if (currentSort === 'popular_asc') {
      items.sort((a, b) => a.popular - b.popular);
    } else {
      items.sort((a, b) => b.popular - a.popular);
    }
    return items;
  }

  function makeCard(p, delay) {
    const l      = window.currentLang || 'ru';
    const inCart = typeof window.isInCart === 'function' && window.isInCart(p.id);
    const card   = document.createElement('article');
    card.className = 'product-card';
    card.tabIndex  = 0;
    card.dataset.productId = p.id;
    card.style.animationDelay = delay + 'ms';
    card.innerHTML = `
      <div class="card-image-wrap">
        <img class="card-img" src="https://rqrsmlbrsgmvsfxfthba.supabase.co/storage/v1/object/public/product-images/thumbs/m${p.id}.webp" alt="${p.type[l]}" loading="lazy">
      </div>
      <div class="card-body">
        <div class="card-info">
          <p class="card-title">${p.title[l]}</p>
          <p class="card-meta"><span class="meta-type">${p.type[l]}</span></p>
          <p class="card-stones">${p.stones[l]}</p>
        </div>
        <div class="card-footer">
          <button class="card-add-btn${inCart ? ' in-cart' : ''}" aria-label="${window.t('cart_add_aria')}" data-tooltip="${inCart ? window.t('cart_remove_tooltip') : window.t('cart_add_aria')}">
            <span class="card-add-label">${inCart ? window.t('cart_in_cart_label') : window.t('cart_add_label')}</span>
            <span class="card-add-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
              </svg>
            </span>
          </button>
        </div>
      </div>
    `;

    card.querySelector('.card-add-btn').addEventListener('click', (e) => {
      e.stopPropagation();
      if (typeof window.isInCart === 'function' && window.isInCart(p.id)) {
        if (typeof window.removeFromCart === 'function') window.removeFromCart(p.id);
      } else {
        if (typeof window.showAddModal === 'function') window.showAddModal(p);
      }
    });

    card.addEventListener('click', () => {
      window.location.href = 'product.html?id=' + p.id;
    });

    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        window.location.href = 'product.html?id=' + p.id;
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

  /* ── PAGINATION ─────────────────────────── */

  function totalPages(items) {
    return Math.max(1, Math.ceil(items.length / getPerPage()));
  }

  function renderPagination(items) {
    if (!paginationEl) return;
    const pages = totalPages(items);

    if (pages <= 1) {
      paginationEl.innerHTML = '';
      return;
    }

    let pagesToShow = [];
    if (pages <= 7) {
      for (let i = 1; i <= pages; i++) pagesToShow.push(i);
    } else if (currentPage <= 4) {
      pagesToShow = [1, 2, 3, 4, 5, '…', pages];
    } else if (currentPage >= pages - 3) {
      pagesToShow = [1, '…', pages - 4, pages - 3, pages - 2, pages - 1, pages];
    } else {
      pagesToShow = [1, '…', currentPage - 1, currentPage, currentPage + 1, '…', pages];
    }

    let html = `<button class="pg-arrow${currentPage === 1 ? ' disabled' : ''}" id="pg-prev" aria-label="Предыдущая страница" ${currentPage === 1 ? 'disabled' : ''}>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
    </button>`;

    pagesToShow.forEach(p => {
      if (p === '…') {
        html += `<span class="pg-ellipsis">…</span>`;
      } else {
        html += `<button class="pg-num${p === currentPage ? ' active' : ''}" data-page="${p}" aria-label="Страница ${p}"${p === currentPage ? ' aria-current="page"' : ''}>${p}</button>`;
      }
    });

    html += `<button class="pg-arrow${currentPage === pages ? ' disabled' : ''}" id="pg-next" aria-label="Следующая страница" ${currentPage === pages ? 'disabled' : ''}>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18l6-6-6-6"/></svg>
    </button>`;

    paginationEl.innerHTML = html;

    paginationEl.querySelectorAll('.pg-num').forEach(btn => {
      btn.addEventListener('click', () => {
        currentPage = Number(btn.dataset.page);
        render();
        scrollToCatalog();
      });
    });

    const prevBtn = paginationEl.querySelector('#pg-prev');
    const nextBtn = paginationEl.querySelector('#pg-next');

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        if (currentPage > 1) { currentPage--; render(); scrollToCatalog(); }
      });
    }
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        if (currentPage < pages) { currentPage++; render(); scrollToCatalog(); }
      });
    }
  }

  function scrollToCatalog() {
    const catalogSection = document.querySelector('.catalog-section');
    if (catalogSection) {
      const top = catalogSection.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  }

  /* ── RENDER CATALOG ─────────────────────── */

  function render() {
    const items = filtered();
    countEl.textContent = items.length;
    grid.innerHTML = '';

    const start = (currentPage - 1) * getPerPage();
    const shown = items.slice(start, start + getPerPage());
    shown.forEach((p, i) => grid.appendChild(makeCard(p, i * 40)));

    renderPagination(items);
    fixCardMetaOverflow();
    renderArticlesPreview();
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
      btn.dataset.tooltip = inCart ? window.t('cart_remove_tooltip') : window.t('cart_add_aria');
    });
  };

  /* ── ARTICLE PREVIEW ────────────────────── */

  function renderArticlesPreview() {
    const previewGrid = document.getElementById('articles-preview-grid');
    if (!previewGrid || !window.WORKSHOP_ARTICLES) return;

    const lang     = window.currentLang || 'ru';
    const readMore = typeof window.t === 'function' ? window.t('articles_read_more') : 'Читать';
    const articles = window.WORKSHOP_ARTICLES.slice(0, 6);

    previewGrid.innerHTML = articles.map(function (article) {
      const a = article[lang] || article.ru;
      const imgHtml = article.image
        ? `<img src="${article.image}" alt="${a.tag}" loading="lazy" onerror="this.parentElement.style.display='none'">`
        : `<div class="ap-card-icon">${article.icon}</div>`;

      return `<a href="workshop-article.html?id=${article.slug}" class="ap-card">
        <div class="ap-card-img">${imgHtml}</div>
        <div class="ap-card-body">
          <p class="ap-card-tag">${a.tag}</p>
          <h3 class="ap-card-title">${a.title.replace(/<br>/g, ' ')}</h3>
          <p class="ap-card-excerpt">${a.excerpt}</p>
          <div class="ap-card-footer">
            <span class="ap-card-readtime">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              ${a.readTime}
            </span>
            <span class="ap-card-cta">${readMore}
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </span>
          </div>
        </div>
      </a>`;
    }).join('');

    /* apply i18n to static text elements in the section */
    const titleEl    = document.querySelector('[data-i18n="articles_section_title"]');
    const subtitleEl = document.querySelector('[data-i18n="articles_section_subtitle"]');
    const allLinkEl  = document.querySelector('[data-i18n="articles_section_all_link"]');
    const btnEl      = document.querySelector('[data-i18n="articles_section_btn"]');
    if (typeof window.t === 'function') {
      if (titleEl)    titleEl.textContent    = window.t('articles_section_title');
      if (subtitleEl) subtitleEl.textContent = window.t('articles_section_subtitle');
      if (allLinkEl)  allLinkEl.textContent  = window.t('articles_section_all_link');
      if (btnEl)      btnEl.textContent      = window.t('articles_section_btn');
    }
  }

  /* ── FILTERS ────────────────────────────── */

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentCategory = btn.dataset.category;
      currentPage     = 1;
      render();
    });
  });

  sortSelect.addEventListener('change', () => {
    currentSort = sortSelect.value;
    currentPage = 1;
    render();
  });

  /* ── CUSTOM SORT DROPDOWN ───────────────── */

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

  /* ── INIT ───────────────────────────────── */

  window.renderCatalog = render;

  if (window.PRODUCTS && window.PRODUCTS.length) render();
  window.addEventListener('productsReady', render);
})();
