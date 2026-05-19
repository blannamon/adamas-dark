/* =============================================
   TRANSLATIONS — bilingual support (ru / ro)
   ============================================= */

window.TRANSLATIONS = {
  ru: {
    page_title:           'AdamasGold — Каталог изделий',

    nav_catalog:          'Каталог',
    nav_workshop:         'Ювелирная мастерская',
    nav_news:             'Новости',
    nav_contacts:         'Контакты',

    hero_title:           'КАТАЛОГ ИЗДЕЛИЙ',
    hero_subtitle:        'Выберите понравившийся дизайн, а мы изготовим украшение для вас в нужном металле, размере и с подходящими камнями.',

    filter_all:           'Все',
    filter_ring:          'Кольца',
    filter_signet:        'Печатки',
    filter_pendant:       'Подвески',
    filter_earrings:      'Серьги',
    filter_bracelet:      'Браслеты',
    filter_chain:         'Цепи',
    filter_cross:         'Кресты',
    filter_exclusive:     'Эксклюзив',

    results_prefix:       'Найдено моделей:',
    sort_label:           'Сортировка',
    sort_popular:         'По популярности',
    sort_price_asc:       'Цена: возрастание',
    sort_price_desc:      'Цена: убывание',

    card_price_label:     'Стоимость:',
    btn_load_more:        'Показать ещё',

    footer_tagline:       'Ювелирная мастерская',
    footer_desc:          'Авторские ювелирные изделия на заказ. От идеи — до воплощения в драгоценном металле.',
    footer_col1_title:    'О нас',
    footer_link_catalog:  'Каталог изделий',
    footer_link_workshop: 'Ювелирная мастерская',
    footer_link_news:     'Новости',
    footer_link_about:    'О компании',
    footer_col2_title:    'Наши услуги',
    footer_link_custom:   'Изготовление на заказ',
    footer_link_repair:   'Ремонт украшений',
    footer_link_engrave:  'Гравировка',
    footer_link_appraise: 'Оценка изделий',
    footer_col3_title:    'Контакты',
    footer_address:       'г. Кишинёв, ул. Букурешть 49',
    footer_copyright:     '© 2024 AdamasGold. Все права защищены.',

    aria_filter_group:    'Категории',
    aria_sort:            'Сортировка',

    cart_title:           'Корзина',
    cart_empty:           'Ваша корзина пуста',
    cart_total_label:     'Итого',
    cart_checkout:        'Оформить заказ',
    cart_add_aria:        'Добавить в корзину',
    cart_close_aria:      'Закрыть корзину',
    cart_remove_aria:     'Убрать из корзины',
    cart_add_label:       'В корзину',
    cart_in_cart_label:   'В корзине',
    cart_comment_placeholder: 'Примечание к заказу...',
  },

  ro: {
    page_title:           'AdamasGold — Catalogul produselor',

    nav_catalog:          'Catalog',
    nav_workshop:         'Atelier de bijuterii',
    nav_news:             'Noutăți',
    nav_contacts:         'Contacte',

    hero_title:           'CATALOGUL PRODUSELOR',
    hero_subtitle:        'Alegeți designul dorit, iar noi vom realiza bijuteria pentru dvs. în metalul, mărimea și cu pietrele potrivite.',

    filter_all:           'Toate',
    filter_ring:          'Inele',
    filter_signet:        'Inele bărbătești',
    filter_pendant:       'Pandantive',
    filter_earrings:      'Cercei',
    filter_bracelet:      'Brățări',
    filter_chain:         'Lanțuri',
    filter_cross:         'Cruci',
    filter_exclusive:     'Exclusive',

    results_prefix:       'Modele găsite:',
    sort_label:           'Sortare',
    sort_popular:         'După popularitate',
    sort_price_asc:       'Preț: crescător',
    sort_price_desc:      'Preț: descrescător',

    card_price_label:     'Preț:',
    btn_load_more:        'Arată mai mult',

    footer_tagline:       'Atelier de bijuterii',
    footer_desc:          'Bijuterii de autor la comandă. De la idee — până la realizare în metal prețios.',
    footer_col1_title:    'Despre noi',
    footer_link_catalog:  'Catalogul produselor',
    footer_link_workshop: 'Atelier de bijuterii',
    footer_link_news:     'Noutăți',
    footer_link_about:    'Despre companie',
    footer_col2_title:    'Serviciile noastre',
    footer_link_custom:   'Fabricare la comandă',
    footer_link_repair:   'Repararea bijuteriilor',
    footer_link_engrave:  'Gravură',
    footer_link_appraise: 'Evaluarea bijuteriilor',
    footer_col3_title:    'Contacte',
    footer_address:       'Chișinău, str. București 49',
    footer_copyright:     '© 2024 AdamasGold. Toate drepturile rezervate.',

    aria_filter_group:    'Categorii',
    aria_sort:            'Sortare',

    cart_title:           'Coșul meu',
    cart_empty:           'Coșul dvs. este gol',
    cart_total_label:     'Total',
    cart_checkout:        'Plasați comanda',
    cart_add_aria:        'Adaugă în coș',
    cart_close_aria:      'Închide coșul',
    cart_remove_aria:     'Elimină din coș',
    cart_add_label:       'În coș',
    cart_in_cart_label:   'Adăugat',
    cart_comment_placeholder: 'Notă la comandă...',
  }
};

window.currentLang = 'ru';

window.t = function (key) {
  return (window.TRANSLATIONS[window.currentLang] || window.TRANSLATIONS.ru)[key] || key;
};

window.applyTranslations = function (lang) {
  window.currentLang = lang;
  document.documentElement.lang = lang;
  document.title = window.t('page_title');

  document.querySelectorAll('[data-i18n]').forEach(function (el) {
    el.textContent = window.t(el.dataset.i18n);
  });

  document.querySelectorAll('[data-i18n-html]').forEach(function (el) {
    el.innerHTML = window.t(el.dataset.i18nHtml);
  });

  document.querySelectorAll('[data-i18n-aria]').forEach(function (el) {
    el.setAttribute('aria-label', window.t(el.dataset.i18nAria));
  });

  document.querySelectorAll('.lang[data-lang]').forEach(function (el) {
    el.classList.toggle('active', el.dataset.lang === lang);
  });

  if (typeof window.renderCatalog === 'function') {
    window.renderCatalog();
  }
};

document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.lang[data-lang]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      window.applyTranslations(this.dataset.lang);
    });
  });
  window.applyTranslations(window.currentLang);
});
