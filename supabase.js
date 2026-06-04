(function () {
  var SUPABASE_URL = 'https://rqrsmlbrsgmvsfxfthba.supabase.co';
  var SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJxcnNtbGJyc2dtdnNmeGZ0aGJhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk4MTE4MjcsImV4cCI6MjA5NTM4NzgyN30.0JNhYQxBSS7HPhOR5lrNXLiP5zyT8jW-6jbsrJMzwBo';

  function mapProduct(p) {
    return {
      id:       p.id,
      category: p.category,
      title:    { ru: p.title_ru, ro: p.title_ro },
      type:     { ru: p.type_ru,  ro: p.type_ro },
      stones:   { ru: p.stones_ru, ro: p.stones_ro },
      popular:  p.popular
    };
  }

  function fireReady() {
    window.dispatchEvent(new CustomEvent('productsReady'));
  }

  fetch(SUPABASE_URL + '/rest/v1/products?select=*&order=popular.desc', {
    headers: {
      'apikey':        SUPABASE_KEY,
      'Authorization': 'Bearer ' + SUPABASE_KEY
    }
  })
  .then(function (res) {
    if (!res.ok) throw new Error('HTTP ' + res.status);
    return res.json();
  })
  .then(function (data) {
    if (data && data.length) {
      window.PRODUCTS = data.map(mapProduct);
    }
    fireReady();
  })
  .catch(function (err) {
    console.warn('Supabase: используются статичные данные (' + err.message + ')');
    fireReady();
  });
})();
