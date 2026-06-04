/* =============================================
   ADAMAS GOLD — CONTACTS PAGE
   ============================================= */

// ── CONTACTS PAGE TRANSLATIONS ────────────────
(function () {
  var CT = {
    ru: {
      ct_page_title:           'Контакты — AdamasGold',
      ct_hero_title:           'КОНТАКТЫ',
      ct_hero_subtitle:        'Будем рады ответить на ваши вопросы. Свяжитесь с нами удобным способом или оставьте заявку.',
      ct_info_title:           'Как с нами связаться',
      ct_address_label:        'Адрес',
      ct_address_val:          'г. Кишинёв, ул. Букурешть 49',
      ct_phone_label:          'Телефон',
      ct_email_label:          'Email',
      ct_hours_label:          'Часы работы',
      ct_hours_val:            'Пн–Пт: 10:00–19:00',
      ct_social_label:         'Мы в соцсетях',
      ct_form_title:           'Написать нам',
      ct_form_name:            'Имя',
      ct_form_phone:           'Телефон',
      ct_form_message:         'Сообщение',
      ct_form_submit:          'Отправить',
      ct_form_success:         'Сообщение отправлено! Мы свяжемся с вами в ближайшее время.',
      ct_form_name_ph:         'Ваше имя',
      ct_form_phone_ph:        '+373 xxx xx xx',
      ct_form_message_ph:      'Ваш вопрос или пожелание...',
    },
    ro: {
      ct_page_title:           'Contacte — AdamasGold',
      ct_hero_title:           'CONTACTE',
      ct_hero_subtitle:        'Suntem bucuroși să răspundem la întrebările dvs. Contactați-ne în mod convenabil sau lăsați o cerere.',
      ct_info_title:           'Cum ne contactați',
      ct_address_label:        'Adresa',
      ct_address_val:          'Chișinău, str. București 49',
      ct_phone_label:          'Telefon',
      ct_email_label:          'Email',
      ct_hours_label:          'Program de lucru',
      ct_hours_val:            'Lun–Vin: 10:00–19:00',
      ct_social_label:         'Rețelele noastre',
      ct_form_title:           'Scrieți-ne',
      ct_form_name:            'Nume',
      ct_form_phone:           'Telefon',
      ct_form_message:         'Mesaj',
      ct_form_submit:          'Trimite',
      ct_form_success:         'Mesajul a fost trimis! Vă vom contacta în cel mai scurt timp.',
      ct_form_name_ph:         'Numele dvs.',
      ct_form_phone_ph:        '+373 xxx xx xx',
      ct_form_message_ph:      'Întrebarea sau dorința dvs...',
    }
  };

  // Merge into global TRANSLATIONS
  ['ru', 'ro'].forEach(function (lang) {
    if (window.TRANSLATIONS && window.TRANSLATIONS[lang]) {
      Object.assign(window.TRANSLATIONS[lang], CT[lang]);
    }
  });

  // Override applyTranslations to also handle placeholders & page title
  var _origApply = window.applyTranslations;
  window.applyTranslations = function (lang) {
    _origApply(lang);

    // Update page title for contacts
    var t = window.t || function(k){ return k; };
    if (t('ct_page_title') !== 'ct_page_title') {
      document.title = t('ct_page_title');
    }

    // Apply placeholders
    var nameInput    = document.getElementById('ct-name');
    var phoneInput   = document.getElementById('ct-phone');
    var msgTextarea  = document.getElementById('ct-message');
    if (nameInput)   nameInput.placeholder   = t('ct_form_name_ph');
    if (phoneInput)  phoneInput.placeholder  = t('ct_form_phone_ph');
    if (msgTextarea) msgTextarea.placeholder = t('ct_form_message_ph');
  };
})();

// ── FORM HANDLING ─────────────────────────────
document.addEventListener('DOMContentLoaded', function () {
  var form    = document.getElementById('ct-form');
  var success = document.getElementById('ct-form-success');
  if (!form || !success) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    var nameInput = document.getElementById('ct-name');
    var valid = true;

    // Basic validation: name required
    if (!nameInput || !nameInput.value.trim()) {
      if (nameInput) {
        nameInput.classList.add('error');
        nameInput.focus();
      }
      valid = false;
    }

    if (!valid) return;

    // Simulate async send (replace with real endpoint if needed)
    var submitBtn = form.querySelector('.ct-form-submit');
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.style.opacity = '0.6';
    }

    setTimeout(function () {
      form.hidden = true;
      success.hidden = false;
    }, 600);
  });

  // Clear error on input
  var inputs = form.querySelectorAll('.ct-form-input, .ct-form-textarea');
  inputs.forEach(function (inp) {
    inp.addEventListener('input', function () {
      inp.classList.remove('error');
    });
  });

  // Re-apply translations once contacts keys are loaded
  if (window.applyTranslations && window.currentLang) {
    window.applyTranslations(window.currentLang);
  }
});
