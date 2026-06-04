/* =============================================
   ADAMAS GOLD — WORKSHOP ARTICLES DATA
   ============================================= */

/* Image naming convention:
   Place photos in assets/articles_images/
   Name each file by article slug:
     restavratsiya.jpg
     zolochenie.jpg
     remont.jpg
     emal.jpg
     3d-modelirovanie.jpg
     izgotovlenie.jpg
   Supported formats: .jpg  .webp  .png
   The site will auto-detect which format you uploaded.
*/

window.WORKSHOP_ARTICLES = [
  {
    slug: 'restavratsiya',
    urlPath: '/uslugi-masterskoj/restavraciya-chistka-izdelij-i-vosstanovlenie-tovarnogo-vida/',
    image: '/assets/articles_images/restavratsiya.webp',
    icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg>`,
    ru: {
      tag: 'Реставрация',
      readTime: '3 мин',
      title: 'Реставрация, чистка и восстановление украшений',
      excerpt: 'Возвращаем украшениям первоначальный блеск и вид с помощью профессионального оборудования. Работаем с изделиями любой сложности — от ежедневных украшений до антикварных реликвий.',
      lead: 'Со временем даже самые любимые украшения теряют блеск. Потёртости, царапины, потемнение металла — неизбежные следы ежедневного ношения. Профессиональная реставрация позволяет вернуть украшению первоначальный вид, сохранив его ценность, историю и сентиментальную значимость.',
      toc: [
        { id: 'chto-takoe', label: 'Что такое реставрация' },
        { id: 'uslugi', label: 'Что включает услуга' },
        { id: 'protsess', label: 'Как мы работаем' },
        { id: 'faq', label: 'Вопросы и ответы' }
      ],
      sections: [
        {
          id: 'chto-takoe',
          title: 'Что такое реставрация украшений',
          type: 'text',
          paragraphs: [
            'Реставрация — комплексная обработка поверхности изделия, направленная на восстановление его товарного вида. В отличие от простой чистки, полноценная реставрация включает работу с металлом: устранение царапин, восстановление утраченных элементов, подбор защитного покрытия.',
            'В мастерской Adamas Gold реставрацию выполняют опытные мастера с использованием профессионального оборудования. Мы работаем с золотом, серебром, платиной и изделиями с любыми вставками из драгоценных и полудрагоценных камней.'
          ]
        },
        {
          id: 'uslugi',
          title: 'Что включает услуга',
          type: 'list',
          items: [
            { title: 'Профессиональная чистка', text: 'Ультразвуковая и химическая чистка удаляет загрязнения из самых труднодоступных мест, не повреждая камни и металл.' },
            { title: 'Полировка поверхности', text: 'Механическая и ручная полировка устраняет царапины и возвращает зеркальный блеск металлу.' },
            { title: 'Пескоструйная обработка', text: 'Метод для восстановления матовых и фактурных поверхностей — создаёт однородное покрытие без повреждения формы изделия.' },
            { title: 'Восстановление элементов', text: 'Ремонт или воссоздание повреждённых декоративных элементов: кастов, зерни, скани, завитков.' },
            { title: 'Защитное покрытие', text: 'При необходимости наносим родиевое или золотое покрытие для длительного сохранения результата.' }
          ]
        },
        {
          id: 'callout1',
          type: 'callout',
          text: 'Мы бережно работаем с антикварными украшениями, семейными реликвиями и изделиями со вставками из хрупких камней — александрита, изумруда, жемчуга. Сложность работы — не причина для отказа, а повод для консультации.'
        },
        {
          id: 'protsess',
          title: 'Как мы работаем',
          type: 'process',
          steps: [
            { title: 'Осмотр и консультация', text: 'Мастер оценивает состояние изделия, определяет объём работ и согласовывает стоимость.' },
            { title: 'Фиксация исходного состояния', text: 'Делаем фотографии до начала работ — для вашего спокойствия и нашей ответственности.' },
            { title: 'Реставрация', text: 'Поэтапная работа по согласованному плану. Срок — от 1 до 7 рабочих дней.' },
            { title: 'Контроль качества и передача', text: 'Финальный осмотр, фото готового изделия. Передаём лично или согласовываем доставку.' }
          ]
        }
      ],
      faq: [
        { q: 'Можно ли реставрировать старинные украшения?', a: 'Да, мы работаем с изделиями любого возраста и сложности. Перед реставрацией проводим детальный осмотр и обсуждаем подход с учётом особенностей конкретного изделия.' },
        { q: 'Сколько времени занимает реставрация?', a: 'Обычно от 1 до 7 рабочих дней в зависимости от состояния изделия и объёма работ. Точные сроки называем после осмотра.' },
        { q: 'Как ухаживать за украшением после реставрации?', a: 'Храните украшения в отдельных мешочках или коробочках, избегайте контакта с химическими средствами и парфюмерией. Профилактическая чистка раз в год поможет сохранить вид надолго.' }
      ]
    },
    ro: {
      tag: 'Restaurare',
      readTime: '3 min',
      title: 'Restaurarea, curățarea și redarea aspectului bijuteriilor',
      excerpt: 'Redăm bijuteriilor strălucirea și aspectul inițial cu ajutorul echipamentelor profesionale. Lucrăm cu piese de orice complexitate — de la bijuterii de zi cu zi până la relicve antice.',
      lead: 'Cu timpul, chiar și cele mai îndrăgite bijuterii își pierd strălucirea. Uzura, zgârieturile, înnegrirea metalului — urme inevitabile ale purtării zilnice. Restaurarea profesională permite redarea aspectului inițial bijuteriei, păstrând valoarea, istoria și importanța sa sentimentală.',
      toc: [
        { id: 'chto-takoe', label: 'Ce este restaurarea' },
        { id: 'uslugi', label: 'Ce include serviciul' },
        { id: 'protsess', label: 'Cum lucrăm' },
        { id: 'faq', label: 'Întrebări și răspunsuri' }
      ],
      sections: [
        {
          id: 'chto-takoe',
          title: 'Ce este restaurarea bijuteriilor',
          type: 'text',
          paragraphs: [
            'Restaurarea reprezintă un tratament complex al suprafeței bijuteriei, menit să îi redea aspectul comercial. Spre deosebire de simpla curățare, restaurarea completă include lucrul cu metalul: eliminarea zgârieturilor, refacerea elementelor pierdute, alegerea acoperirii de protecție.',
            'La atelierul Adamas Gold, restaurarea este realizată de meșteri experimentați cu echipamente profesionale. Lucrăm cu aur, argint, platină și bijuterii cu orice inserturi din pietre prețioase și semiprețioase.'
          ]
        },
        {
          id: 'uslugi',
          title: 'Ce include serviciul',
          type: 'list',
          items: [
            { title: 'Curățare profesională', text: 'Curățarea cu ultrasunete și chimică elimină murdăria din cele mai greu accesibile locuri, fără a deteriora pietrele și metalul.' },
            { title: 'Lustruire a suprafeței', text: 'Lustruirea mecanică și manuală elimină zgârieturile și redă metalului strălucirea ca în oglindă.' },
            { title: 'Sablare', text: 'Metodă pentru restaurarea suprafețelor mate și texturate — creează un înveliș uniform fără a deteriora forma bijuteriei.' },
            { title: 'Restaurarea elementelor', text: 'Repararea sau recrearea elementelor decorative deteriorate: monturi, granulație, filigran, spirale.' },
            { title: 'Acoperire de protecție', text: 'La necesitate, aplicăm acoperire din rodiu sau aur pentru conservarea îndelungată a rezultatului.' }
          ]
        },
        {
          id: 'callout1',
          type: 'callout',
          text: 'Lucrăm cu grijă cu bijuterii antice, relicve de familie și piese cu inserturi din pietre fragile — alexandrit, smarald, perle. Complexitatea lucrării nu este motiv de refuz, ci un motiv de consultație.'
        },
        {
          id: 'protsess',
          title: 'Cum lucrăm',
          type: 'process',
          steps: [
            { title: 'Examinare și consultație', text: 'Meșterul evaluează starea bijuteriei, determină volumul de lucru și convine asupra costului.' },
            { title: 'Fixarea stării inițiale', text: 'Facem fotografii înainte de începerea lucrărilor — pentru liniștea dvs. și responsabilitatea noastră.' },
            { title: 'Restaurarea', text: 'Lucru etapizat conform planului convenit. Termenul — de la 1 la 7 zile lucrătoare.' },
            { title: 'Control de calitate și predare', text: 'Inspecție finală, fotografia bijuteriei finite. Predăm personal sau convenim livrarea.' }
          ]
        }
      ],
      faq: [
        { q: 'Pot fi restaurate bijuteriile vechi și antice?', a: 'Da, lucrăm cu piese de orice vârstă și complexitate. Înainte de restaurare, efectuăm o inspecție detaliată și discutăm abordarea ținând cont de particularitățile piesei concrete.' },
        { q: 'Cât timp durează restaurarea?', a: 'De obicei de la 1 la 7 zile lucrătoare, în funcție de starea bijuteriei și volumul de lucru. Termenele exacte le anunțăm după inspecție.' },
        { q: 'Cum să îngrijim bijuteria după restaurare?', a: 'Păstrați bijuteriile în pungi sau cutii separate, evitați contactul cu produse chimice și parfumuri. Curățarea preventivă o dată pe an va ajuta la menținerea aspectului timp îndelungat.' }
      ]
    }
  },

  {
    slug: 'zolochenie',
    urlPath: '/uslugi-masterskoj/zolochenie-serebrenie-rodirovanie-yuvelirnyx-izdelij/',
    image: '/assets/articles_images/zolochenie.webp',
    icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/><path d="M8 12h4"/></svg>`,
    ru: {
      tag: 'Покрытие',
      readTime: '4 мин',
      title: 'Золочение, серебрение и родирование украшений',
      excerpt: 'Профессиональное гальваническое покрытие — жёлтое и розовое золото, серебро, родий. Обновляем потускневшие украшения и придаём новый вид старым изделиям.',
      lead: 'Гальваническое покрытие — один из наиболее эффективных способов обновить украшение или кардинально изменить его внешний вид. Золочение, серебрение и родирование защищают металл от окисления, придают изделию роскошный вид и значительно продлевают его срок службы.',
      toc: [
        { id: 'vidy', label: 'Виды покрытий' },
        { id: 'uslugi', label: 'Наши покрытия' },
        { id: 'protsess', label: 'Этапы работы' },
        { id: 'faq', label: 'Вопросы и ответы' }
      ],
      sections: [
        {
          id: 'vidy',
          title: 'Виды покрытий',
          type: 'text',
          paragraphs: [
            'Гальваническое покрытие — это нанесение тонкого слоя металла на поверхность украшения методом электролиза. Толщина слоя варьируется от нескольких микрон до 25 мкм (для родия) — этого достаточно для обеспечения длительной защиты и визуального эффекта.',
            'Перед нанесением нового покрытия обязательно удаляется старый слой и проводится зеркальная полировка — только так результат будет безупречным и долговечным.'
          ]
        },
        {
          id: 'uslugi',
          title: 'Наши покрытия',
          type: 'list',
          items: [
            { title: 'Жёлтое золото 585', text: 'Классическое золотое покрытие высокой пробы. Придаёт изделию тёплый, роскошный блеск и защищает от потемнения.' },
            { title: 'Розовое золото', text: 'Романтичный розовый оттенок, актуальный в современных коллекциях. Обновляет изделия и придаёт им современный вид.' },
            { title: 'Серебрение', text: 'Покрытие серебром создаёт эффект зеркального блеска и защищает металл от окисления. Идеально для обновления серебряных украшений.' },
            { title: 'Родирование', text: 'Родий — металл платиновой группы, покрытие толщиной до 25 мкм. Повышает твёрдость поверхности, усиливает блеск бриллиантов и защищает от царапин.' }
          ]
        },
        {
          id: 'callout1',
          type: 'callout',
          text: 'Родирование белого золота — обязательная процедура раз в 1–2 года. Белое золото само по себе имеет желтоватый оттенок; именно родий создаёт тот ослепительный белый блеск, который все так ценят.'
        },
        {
          id: 'protsess',
          title: 'Этапы работы',
          type: 'process',
          steps: [
            { title: 'Оценка и консультация', text: 'Обсуждаем желаемый результат, подбираем тип и цвет покрытия, согласовываем стоимость.' },
            { title: 'Снятие старого покрытия', text: 'Химическое удаление предыдущего слоя — обязательный шаг для идеального сцепления нового.' },
            { title: 'Зеркальная полировка', text: 'Подготавливаем поверхность: устраняем царапины и добиваемся идеально гладкой базы.' },
            { title: 'Гальваническое покрытие', text: 'Нанесение металлического слоя в гальванической ванне. Срок — 1–3 рабочих дня.' }
          ]
        }
      ],
      faq: [
        { q: 'Как долго держится покрытие?', a: 'Срок службы зависит от типа покрытия, образа жизни и ухода. Родирование — 1–2 года, золочение — 2–5 лет при аккуратном обращении. Мы дадим рекомендации по уходу для максимального результата.' },
        { q: 'Можно ли покрыть украшение другого цвета, например серебряное — золотом?', a: 'Да, мы выполняем покрытие любых металлов. Серебряное кольцо можно покрыть жёлтым или розовым золотом, родием — результат будет профессиональным и долговечным.' },
        { q: 'Нужна ли подготовка изделия перед покрытием?', a: 'Всегда. Перед нанесением нового слоя мы снимаем старое покрытие и проводим полировку. Это обязательный этап, без которого результат не будет качественным.' }
      ]
    },
    ro: {
      tag: 'Placare',
      readTime: '4 min',
      title: 'Aurire, argentare și rodiere a bijuteriilor',
      excerpt: 'Placare galvanică profesională — aur galben și roz, argint, rodiu. Reînnoim bijuteriile înnegrite și oferim un aspect nou pieselor vechi.',
      lead: 'Placarea galvanică este una dintre cele mai eficiente metode de a reînnoi o bijuterie sau de a-i schimba radical aspectul. Aurirea, argentarea și rodierea protejează metalul de oxidare, conferă bijuteriei un aspect luxos și îi prelungesc semnificativ durata de viață.',
      toc: [
        { id: 'vidy', label: 'Tipuri de acoperiri' },
        { id: 'uslugi', label: 'Acoperirile noastre' },
        { id: 'protsess', label: 'Etapele lucrului' },
        { id: 'faq', label: 'Întrebări și răspunsuri' }
      ],
      sections: [
        {
          id: 'vidy',
          title: 'Tipuri de acoperiri',
          type: 'text',
          paragraphs: [
            'Placarea galvanică presupune depunerea unui strat subțire de metal pe suprafața bijuteriei prin electroliză. Grosimea stratului variază de la câțiva microni până la 25 μm (pentru rodiu) — suficient pentru a asigura protecție durabilă și efect vizual.',
            'Înainte de aplicarea unui nou strat, este obligatorie îndepărtarea celui vechi și lustruirea în oglindă — doar astfel rezultatul va fi impecabil și durabil.'
          ]
        },
        {
          id: 'uslugi',
          title: 'Acoperirile noastre',
          type: 'list',
          items: [
            { title: 'Aur galben 585', text: 'Acoperire clasică din aur de calitate superioară. Conferă bijuteriei o strălucire caldă, luxoasă și o protejează de înnegrire.' },
            { title: 'Aur roz', text: 'Nuanță romantică de roz, actuală în colecțiile moderne. Reînnoiește bijuteriile și le conferă un aspect contemporan.' },
            { title: 'Argentare', text: 'Acoperirea cu argint creează efectul de strălucire în oglindă și protejează metalul de oxidare. Ideală pentru reînnoirea bijuteriilor din argint.' },
            { title: 'Rodiere', text: 'Rodiul este un metal din grupul platinei, acoperire cu grosimea de până la 25 μm. Crește duritatea suprafeței, sporește strălucirea diamantelor și protejează de zgârieturi.' }
          ]
        },
        {
          id: 'callout1',
          type: 'callout',
          text: 'Rodierea aurului alb este o procedură obligatorie o dată la 1–2 ani. Aurul alb în sine are o nuanță gălbuie; tocmai rodiul creează acea strălucire albă orbitor de frumoasă pe care toți o apreciază.'
        },
        {
          id: 'protsess',
          title: 'Etapele lucrului',
          type: 'process',
          steps: [
            { title: 'Evaluare și consultație', text: 'Discutăm rezultatul dorit, selectăm tipul și culoarea acoperirii, convenim asupra costului.' },
            { title: 'Îndepărtarea acoperirii vechi', text: 'Eliminarea chimică a stratului anterior — etapă obligatorie pentru o aderență perfectă a celui nou.' },
            { title: 'Lustruire în oglindă', text: 'Pregătim suprafața: eliminăm zgârieturile și obținem o bază perfect netedă.' },
            { title: 'Placare galvanică', text: 'Depunerea stratului metalic în baia galvanică. Termen — 1–3 zile lucrătoare.' }
          ]
        }
      ],
      faq: [
        { q: 'Cât timp rezistă acoperirea?', a: 'Durata de viață depinde de tipul acoperirii, stilul de viață și îngrijire. Rodierea — 1–2 ani, aurirea — 2–5 ani cu manevrare atentă. Vom oferi recomandări de îngrijire pentru un rezultat maxim.' },
        { q: 'Se poate acoperi o bijuterie de altă culoare, de exemplu argintul cu aur?', a: 'Da, realizăm acoperirea oricăror metale. Un inel de argint poate fi acoperit cu aur galben sau roz, rodiu — rezultatul va fi profesional și durabil.' },
        { q: 'Este necesară pregătirea bijuteriei înainte de acoperire?', a: 'Întotdeauna. Înainte de aplicarea unui nou strat, îndepărtăm acoperirea veche și realizăm lustruirea. Aceasta este o etapă obligatorie, fără de care rezultatul nu va fi de calitate.' }
      ]
    }
  },

  {
    slug: 'remont',
    urlPath: '/uslugi-masterskoj/remont-yuvelirnyx-izdelij-zamena-zamkov-pajka-izmenenie-razmera/',
    image: '/assets/articles_images/remont.webp',
    icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>`,
    ru: {
      tag: 'Ремонт',
      readTime: '3 мин',
      title: 'Ремонт ювелирных изделий: замки, пайка, изменение размера',
      excerpt: 'Профессиональный ремонт украшений — замена замков, пайка, изменение размера кольца, замена утраченных камней. Мастера подбирают металл точно по пробе и цвету.',
      lead: 'Любимые украшения нередко становятся жертвой случайностей — сломанная застёжка, трещина в оправе, потерянный камень. Не стоит расставаться с ценной вещью: опытные мастера мастерской Adamas Gold устранят любую поломку, сохранив внешний вид изделия.',
      toc: [
        { id: 'chto-takoe', label: 'Что мы ремонтируем' },
        { id: 'uslugi', label: 'Виды ремонта' },
        { id: 'protsess', label: 'Как мы работаем' },
        { id: 'faq', label: 'Вопросы и ответы' }
      ],
      sections: [
        {
          id: 'chto-takoe',
          title: 'Что мы ремонтируем',
          type: 'text',
          paragraphs: [
            'Мастерская Adamas Gold выполняет ремонт украшений любой сложности: кольца, серьги, подвески, цепочки, браслеты. Мы работаем с изделиями из желтого, белого и розового золота, серебра, платины.',
            'Ювелиры мастерской подбирают металл точно по цвету и пробе, поэтому места пайки и замены элементов остаются незаметными. Каждое отремонтированное украшение проходит финальную чистку и полировку.'
          ]
        },
        {
          id: 'uslugi',
          title: 'Виды ремонта',
          type: 'list',
          items: [
            { title: 'Замена замков и застёжек', text: 'Ремонт или замена карабинов, пружинных и коробчатых застёжек на цепочках и браслетах.' },
            { title: 'Пайка', text: 'Восстановление целостности металла: ремонт трещин, разломов звеньев цепочки, пайка серёг.' },
            { title: 'Изменение размера кольца', text: 'Уменьшение или увеличение размера без потери пробы металла и целостности рисунка.' },
            { title: 'Замена утраченных камней', text: 'Подбор и установка камней-заменителей точно под оправу — по форме, размеру и цвету.' },
            { title: 'Восстановление деформированных изделий', text: 'Выправление гнутых колец, серёг, подвесок и возвращение им исходной формы.' }
          ]
        },
        {
          id: 'callout1',
          type: 'callout',
          text: 'При пайке и изменении размера мастера используют металл той же пробы, что и исходное изделие. Место работы после полировки становится практически незаметным.'
        },
        {
          id: 'protsess',
          title: 'Как мы работаем',
          type: 'process',
          steps: [
            { title: 'Осмотр и оценка', text: 'Мастер осматривает изделие, определяет характер поломки, согласовывает объём работ и стоимость.' },
            { title: 'Подбор материала', text: 'Для пайки и замены элементов подбирается металл той же пробы и цвета.' },
            { title: 'Ремонт', text: 'Профессиональное устранение неисправности с соблюдением исходного вида изделия. Срок — от 1 до 5 дней.' },
            { title: 'Чистка, полировка, передача', text: 'Готовое изделие проходит финальную чистку и полировку. Отдаём лично или доставляем.' }
          ]
        }
      ],
      faq: [
        { q: 'Можно ли изменить размер кольца со вставками?', a: 'В большинстве случаев — да. Однако некоторые модели с непрерывным орнаментом или большим количеством камней требуют индивидуального подхода. Мастер оценит изделие и расскажет о возможностях.' },
        { q: 'Сколько стоит ремонт?', a: 'Стоимость зависит от вида и объёма работ. Базовая чистка и мелкий ремонт — от нескольких сотен леев. Точную цену называем после осмотра изделия.' },
        { q: 'Что делать, если украшение сломалось во время поездки?', a: 'Привезите или пришлите нам изделие — мы оценим состояние и свяжемся с вами для согласования деталей. Возможна курьерская доставка по Молдове.' }
      ]
    },
    ro: {
      tag: 'Reparare',
      readTime: '3 min',
      title: 'Repararea bijuteriilor: încuietori, lipire, schimbarea mărimii',
      excerpt: 'Reparare profesională a bijuteriilor — înlocuirea încuietorilor, lipire, modificarea mărimii inelului, înlocuirea pietrelor pierdute. Meșterii selectează metalul exact după titlu și culoare.',
      lead: 'Bijuteriile preferate devin adesea victime ale accidentelor — o agrafă spartă, o fisură în montură, o piatră pierdută. Nu trebuie să renunțați la un obiect prețios: meșterii experimentați ai atelierului Adamas Gold vor elimina orice defecțiune, păstrând aspectul bijuteriei.',
      toc: [
        { id: 'chto-takoe', label: 'Ce reparăm' },
        { id: 'uslugi', label: 'Tipuri de reparații' },
        { id: 'protsess', label: 'Cum lucrăm' },
        { id: 'faq', label: 'Întrebări și răspunsuri' }
      ],
      sections: [
        {
          id: 'chto-takoe',
          title: 'Ce reparăm',
          type: 'text',
          paragraphs: [
            'Atelierul Adamas Gold efectuează repararea bijuteriilor de orice complexitate: inele, cercei, pandantive, lanțuri, brățări. Lucrăm cu piese din aur galben, alb și roz, argint, platină.',
            'Bijutierii atelierului selectează metalul exact după culoare și titlu, astfel încât locurile de lipire și înlocuire a elementelor rămân imperceptibile. Fiecare bijuterie reparată trece printr-o curățare și lustruire finală.'
          ]
        },
        {
          id: 'uslugi',
          title: 'Tipuri de reparații',
          type: 'list',
          items: [
            { title: 'Înlocuirea încuietorilor și agrafelor', text: 'Repararea sau înlocuirea carabinelor, închizătoarelor cu arc și cu cutie de la lanțuri și brățări.' },
            { title: 'Lipire', text: 'Refacerea integrității metalului: repararea fisurilor, a legăturilor rupte de lanț, lipirea cerceilor.' },
            { title: 'Modificarea mărimii inelului', text: 'Micșorarea sau mărirea dimensiunii fără pierderea titlului metalului și a integrității motivului.' },
            { title: 'Înlocuirea pietrelor pierdute', text: 'Selectarea și montarea pietrelor de înlocuire exact în montură — după formă, dimensiune și culoare.' },
            { title: 'Restaurarea bijuteriilor deformate', text: 'Îndreptarea inelelor, cerceilor, pandantivelor îndoite și redarea formei lor inițiale.' }
          ]
        },
        {
          id: 'callout1',
          type: 'callout',
          text: 'La lipire și modificarea mărimii, meșterii folosesc metal de același titlu ca și bijuteria originală. Locul de lucru după lustruire devine practic imperceptibil.'
        },
        {
          id: 'protsess',
          title: 'Cum lucrăm',
          type: 'process',
          steps: [
            { title: 'Examinare și evaluare', text: 'Meșterul examinează bijuteria, determină caracterul defecțiunii, convine volumul de lucru și costul.' },
            { title: 'Selectarea materialului', text: 'Pentru lipire și înlocuirea elementelor se selectează metal de același titlu și culoare.' },
            { title: 'Repararea', text: 'Eliminarea profesională a defecțiunii cu respectarea aspectului inițial. Termen — de la 1 la 5 zile.' },
            { title: 'Curățare, lustruire, predare', text: 'Bijuteria finită trece printr-o curățare și lustruire finală. Predăm personal sau livrăm.' }
          ]
        }
      ],
      faq: [
        { q: 'Se poate modifica mărimea unui inel cu inserturi?', a: 'În majoritatea cazurilor — da. Totuși, unele modele cu ornament continuu sau cu un număr mare de pietre necesită o abordare individuală. Meșterul va evalua bijuteria și va explica posibilitățile.' },
        { q: 'Cât costă repararea?', a: 'Costul depinde de tipul și volumul lucrărilor. Curățarea de bază și reparațiile minore — de la câteva sute de lei. Prețul exact îl anunțăm după inspecția bijuteriei.' },
        { q: 'Ce să fac dacă bijuteria s-a stricat în timpul unei călătorii?', a: 'Aduceți sau trimiteți-ne bijuteria — vom evalua starea și vă vom contacta pentru a conveni detaliile. Este posibilă livrarea cu curier în toată Moldova.' }
      ]
    }
  },

  {
    slug: 'emal',
    urlPath: '/uslugi-masterskoj/nanesenie-emali-na-yuvelirnye-izdeliya/',
    image: '/assets/articles_images/emal.webp',
    icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="13.5" cy="6.5" r="2.5"/><circle cx="17.5" cy="10.5" r="2.5"/><circle cx="8.5" cy="7.5" r="2.5"/><circle cx="6.5" cy="12.5" r="2.5"/><path d="M12 20a6 6 0 0 1-6-6c0-1 .5-2 2-2.5s3.5-.5 5 .5"/><path d="M12 20a6 6 0 0 0 6-6c0-1-.5-2-2-2.5"/></svg>`,
    ru: {
      tag: 'Эмаль',
      readTime: '3 мин',
      title: 'Нанесение эмали<br>на ювелирные изделия',
      excerpt: 'Художественное покрытие эмалью придаёт украшениям уникальные цветовые акценты и декоративную глубину. Используем горячую, холодную и перегородчатую эмаль.',
      lead: 'Эмаль — один из старейших и наиболее выразительных способов украсить ювелирное изделие. Равномерное покрытие поверхности легкосплавным стеклом создаёт декоративный слой исключительной красоты — насыщенный, глубокий, долговечный.',
      toc: [
        { id: 'chto-takoe', label: 'Что такое эмаль' },
        { id: 'vidy', label: 'Виды эмали' },
        { id: 'protsess', label: 'Как мы работаем' },
        { id: 'faq', label: 'Вопросы и ответы' }
      ],
      sections: [
        {
          id: 'chto-takoe',
          title: 'Что такое эмаль в ювелирном деле',
          type: 'text',
          paragraphs: [
            'Ювелирная эмаль — это равномерное покрытие поверхности изделия легкоплавким стеклом. После обжига покрытие становится твёрдым, гладким и глубоко насыщенным по цвету. Эмалевые украшения известны со времён Древнего Египта и по сей день не выходят из моды.',
            'Мастера Adamas Gold владеют несколькими техниками нанесения эмали. Выбор техники зависит от типа изделия, пожеланий клиента и художественного замысла.'
          ]
        },
        {
          id: 'vidy',
          title: 'Виды эмали',
          type: 'list',
          items: [
            { title: 'Горячая (витражная) эмаль', text: 'Наносится в несколько слоёв и обжигается при температуре около 800°C. Даёт насыщенный, глубокий цвет и высокую долговечность.' },
            { title: 'Холодная (эпоксидная) эмаль', text: 'Не требует обжига — застывает при комнатной температуре. Позволяет работать с широкой палитрой цветов и сложными градиентами.' },
            { title: 'Перегородчатая эмаль (клуазоне)', text: 'Классическая ювелирная техника: тонкие металлические перегородки разделяют поля разных цветов. Каждое изделие становится уникальным произведением искусства.' },
            { title: 'Цветовая кастомизация', text: 'Подбираем цвет эмали под запрос клиента — от нежных пастельных до насыщенных глубоких оттенков.' }
          ]
        },
        {
          id: 'callout1',
          type: 'callout',
          text: 'Правильно нанесённая эмаль исключительно долговечна и не требует особого ухода. Избегайте лишь резких механических ударов — эмаль, как и стекло, не любит сколов.'
        },
        {
          id: 'protsess',
          title: 'Как мы работаем',
          type: 'process',
          steps: [
            { title: 'Консультация', text: 'Обсуждаем желаемый цвет, технику, показываем образцы. Подбираем оптимальный вариант для вашего изделия.' },
            { title: 'Подготовка поверхности', text: 'Тщательная очистка и обработка металла для обеспечения надёжного сцепления эмали.' },
            { title: 'Нанесение эмали', text: 'Послойное нанесение с промежуточной обработкой. Срок — 2–5 рабочих дней.' },
            { title: 'Финишная обработка', text: 'Полировка, проверка равномерности покрытия, финальный осмотр и передача изделия.' }
          ]
        }
      ],
      faq: [
        { q: 'На какие металлы можно наносить эмаль?', a: 'Лучше всего эмаль держится на золоте, серебре и меди. На других металлах применяется холодная эпоксидная эмаль. Мастер подберёт оптимальную технику для вашего изделия.' },
        { q: 'Можно ли удалить или заменить эмаль?', a: 'Горячую эмаль можно снять механически и нанести заново. Это позволяет обновить цвет или исправить повреждение. Обратитесь к нам — оценим возможности.' },
        { q: 'Как ухаживать за украшением с эмалью?', a: 'Избегайте резких ударов и падений. Чистите мягкой тканью без абразивов. Ультразвуковая чистка для эмалированных украшений не рекомендуется.' }
      ]
    },
    ro: {
      tag: 'Email',
      readTime: '3 min',
      title: 'Aplicarea emailului<br>pe bijuterii',
      excerpt: 'Acoperirea artistică cu email conferă bijuteriilor accente coloristice unice și profunzime decorativă. Folosim email la cald, rece și cloisonné.',
      lead: 'Emailul este una dintre cele mai vechi și mai expresive metode de a decora o bijuterie. Acoperirea uniformă a suprafeței cu sticlă cu punct de topire scăzut creează un strat decorativ de o frumusețe excepțională — intens, profund, durabil.',
      toc: [
        { id: 'chto-takoe', label: 'Ce este emailul' },
        { id: 'vidy', label: 'Tipuri de email' },
        { id: 'protsess', label: 'Cum lucrăm' },
        { id: 'faq', label: 'Întrebări și răspunsuri' }
      ],
      sections: [
        {
          id: 'chto-takoe',
          title: 'Ce este emailul în bijuterie',
          type: 'text',
          paragraphs: [
            'Emailul de bijuterie reprezintă acoperirea uniformă a suprafeței piesei cu sticlă fuzibilă. După ardere, acoperirea devine dură, netedă și intens colorată. Bijuteriile emailate sunt cunoscute din timpurile Egiptului Antic și nu au ieșit din modă nici astăzi.',
            'Meșterii Adamas Gold stăpânesc mai multe tehnici de aplicare a emailului. Alegerea tehnicii depinde de tipul bijuteriei, dorințele clientului și concepția artistică.'
          ]
        },
        {
          id: 'vidy',
          title: 'Tipuri de email',
          type: 'list',
          items: [
            { title: 'Email cald (vitraliu)', text: 'Se aplică în mai multe straturi și se arde la aproximativ 800°C. Oferă o culoare intensă, profundă și o durabilitate ridicată.' },
            { title: 'Email rece (epoxidic)', text: 'Nu necesită ardere — se solidifică la temperatura camerei. Permite lucrul cu o paletă largă de culori și degradeuri complexe.' },
            { title: 'Email cloisonné', text: 'Tehnică clasică de bijuterie: pereți subțiri de metal separă câmpuri de culori diferite. Fiecare piesă devine o operă de artă unică.' },
            { title: 'Personalizare cromatică', text: 'Selectăm culoarea emailului la cererea clientului — de la nuanțe pastelate delicate până la tonuri intense și profunde.' }
          ]
        },
        {
          id: 'callout1',
          type: 'callout',
          text: 'Emailul aplicat corect este extrem de durabil și nu necesită îngrijire specială. Evitați doar loviturile mecanice bruște — emailul, ca și sticla, nu rezistă la ciobituri.'
        },
        {
          id: 'protsess',
          title: 'Cum lucrăm',
          type: 'process',
          steps: [
            { title: 'Consultație', text: 'Discutăm culoarea dorită, tehnica, arătăm mostre. Selectăm varianta optimă pentru bijuteria dvs.' },
            { title: 'Pregătirea suprafeței', text: 'Curățarea și tratarea atentă a metalului pentru asigurarea aderenței fiabile a emailului.' },
            { title: 'Aplicarea emailului', text: 'Aplicare strat cu strat cu tratament intermediar. Termen — 2–5 zile lucrătoare.' },
            { title: 'Prelucrare finală', text: 'Lustruire, verificarea uniformității acoperirii, inspecție finală și predarea bijuteriei.' }
          ]
        }
      ],
      faq: [
        { q: 'Pe ce metale se poate aplica emailul?', a: 'Emailul aderă cel mai bine pe aur, argint și cupru. Pe alte metale se utilizează emailul epoxidic rece. Meșterul va selecta tehnica optimă pentru bijuteria dvs.' },
        { q: 'Poate fi înlăturat sau înlocuit emailul?', a: 'Emailul cald poate fi îndepărtat mecanic și aplicat din nou. Aceasta permite actualizarea culorii sau corectarea deteriorării. Contactați-ne — vom evalua posibilitățile.' },
        { q: 'Cum să îngrijim bijuteria cu email?', a: 'Evitați loviturile și căderile bruște. Curățați cu o cârpă moale fără abrazivi. Curățarea cu ultrasunete pentru bijuteriile emailate nu este recomandată.' }
      ]
    }
  },

  {
    slug: '3d-modelirovanie',
    urlPath: '/uslugi-masterskoj/3d-modelirovanie-yuvelirnyx-izdelij/',
    image: '/assets/articles_images/3d-modelirovanie.webp',
    icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>`,
    ru: {
      tag: '3D моделирование',
      readTime: '4 мин',
      title: '3D моделирование и прототипирование украшений',
      excerpt: 'Создаём точную цифровую модель будущего украшения до начала литья. Вы видите результат заранее — форму, детали, расположение камней — и вносите правки до производства.',
      lead: '3D моделирование и прототипирование занимает лидирующие позиции в современном ювелирном производстве. Технология позволяет создавать изделия любой сложности с максимальной точностью, полностью согласовывая результат с клиентом ещё до начала литья.',
      toc: [
        { id: 'vozmozhnosti', label: 'Возможности технологии' },
        { id: 'preimushhestva', label: 'Преимущества 3D' },
        { id: 'protsess', label: 'Этапы работы' },
        { id: 'faq', label: 'Вопросы и ответы' }
      ],
      sections: [
        {
          id: 'vozmozhnosti',
          title: 'Возможности 3D моделирования',
          type: 'text',
          paragraphs: [
            'Трёхмерная модель позволяет увидеть украшение во всех деталях ещё до его физического создания. Клиент может оценить форму, пропорции, расположение камней и при необходимости внести корректировки — без дополнительных затрат на переделку готового изделия.',
            'После утверждения модели создаётся восковой прототип методом 3D-печати, который затем используется для литья в выбранном металле. Это обеспечивает исключительную точность воспроизведения даже самых сложных деталей.'
          ]
        },
        {
          id: 'preimushhestva',
          title: 'Преимущества 3D моделирования',
          type: 'list',
          items: [
            { title: 'Изделия любой сложности', text: 'Тонкие решётки, сложная многоуровневая огранка, миниатюрные детали — 3D позволяет воплотить любой замысел.' },
            { title: 'Предварительная визуализация', text: 'Вы видите итоговый вид украшения с расположением камней и цветом металла до начала производства.' },
            { title: 'Правки без дополнительных затрат', text: 'Любые изменения вносятся в модель — без переплавки и переработки уже готового изделия.' },
            { title: 'Точный расчёт веса и размера', text: 'Ещё на этапе модели рассчитываем точный вес изделия в выбранном металле и согласовываем стоимость.' }
          ]
        },
        {
          id: 'callout1',
          type: 'callout',
          text: 'Стоимость и сроки 3D моделирования обсуждаются индивидуально — после изучения технического задания. Чем детальнее вы опишете пожелания, тем точнее будет результат.'
        },
        {
          id: 'protsess',
          title: 'Этапы работы',
          type: 'process',
          steps: [
            { title: 'Сбор технического задания', text: 'Обсуждаем идею, пожелания по форме, металлу, камням. Клиент предоставляет референсы или описание.' },
            { title: 'Создание 3D модели', text: 'Дизайнер-ювелир создаёт цифровую модель и отправляет клиенту для согласования.' },
            { title: 'Согласование и правки', text: 'На этом этапе вносим любые изменения — форма, размер, детали, расположение камней.' },
            { title: 'Прототипирование', text: 'Печать воскового прототипа на 3D-принтере для финальной проверки перед литьём.' },
            { title: 'Литьё и финишная обработка', text: 'Отливка в выбранном металле, полировка, установка камней, контроль качества.' }
          ]
        }
      ],
      faq: [
        { q: 'Можно ли сделать украшение по фотографии?', a: 'Да, 3D моделирование позволяет воссоздать украшение по фотографии с высокой точностью. Это также основной инструмент для изготовления парных украшений или точных копий.' },
        { q: 'Сколько времени занимает создание модели?', a: 'Обычно от 3 до 7 рабочих дней в зависимости от сложности. После согласования на литьё и финишную обработку уходит ещё 15–20 дней.' },
        { q: 'Что такое технические задание и что туда включить?', a: 'ТЗ — это описание вашего украшения: форма, размер, металл, камни, желаемый стиль. Чем больше деталей, тем точнее модель. Если затрудняетесь — просто расскажите идею, мастер поможет.' }
      ]
    },
    ro: {
      tag: 'Modelare 3D',
      readTime: '4 min',
      title: 'Modelare 3D și prototipare a bijuteriilor',
      excerpt: 'Creăm un model digital precis al viitoarei bijuterii înainte de turnare. Vedeți rezultatul în avans — forma, detaliile, amplasarea pietrelor — și faceți modificări înainte de producție.',
      lead: 'Modelarea 3D și prototiparea ocupă poziții de lider în producția modernă de bijuterii. Tehnologia permite crearea de piese de orice complexitate cu precizie maximă, coordonând complet rezultatul cu clientul înainte de începerea turnării.',
      toc: [
        { id: 'vozmozhnosti', label: 'Posibilitățile tehnologiei' },
        { id: 'preimushhestva', label: 'Avantajele 3D' },
        { id: 'protsess', label: 'Etapele lucrului' },
        { id: 'faq', label: 'Întrebări și răspunsuri' }
      ],
      sections: [
        {
          id: 'vozmozhnosti',
          title: 'Posibilitățile modelării 3D',
          type: 'text',
          paragraphs: [
            'Modelul tridimensional permite vizualizarea bijuteriei în toate detaliile înainte de crearea fizică a acesteia. Clientul poate evalua forma, proporțiile, amplasarea pietrelor și, dacă este necesar, să facă ajustări — fără costuri suplimentare pentru refacerea piesei finite.',
            'După aprobarea modelului, se creează un prototip din ceară prin imprimare 3D, care este ulterior utilizat pentru turnarea în metalul ales. Aceasta asigură o precizie excepțională de reproducere chiar și a celor mai complexe detalii.'
          ]
        },
        {
          id: 'preimushhestva',
          title: 'Avantajele modelării 3D',
          type: 'list',
          items: [
            { title: 'Piese de orice complexitate', text: 'Rețele fine, fatetare complexă pe mai multe niveluri, detalii minuscule — 3D permite realizarea oricărei idei.' },
            { title: 'Vizualizare preliminară', text: 'Vedeți aspectul final al bijuteriei cu amplasarea pietrelor și culoarea metalului înainte de producție.' },
            { title: 'Modificări fără costuri suplimentare', text: 'Orice schimbări se fac în model — fără retopire și reprocesare a piesei deja finite.' },
            { title: 'Calcul precis al greutății și dimensiunii', text: 'Chiar în etapa modelului calculăm greutatea exactă a bijuteriei în metalul ales și convenim costul.' }
          ]
        },
        {
          id: 'callout1',
          type: 'callout',
          text: 'Costul și termenele modelării 3D se discută individual — după studierea specificației tehnice. Cu cât descrieți mai detaliat dorințele, cu atât rezultatul va fi mai precis.'
        },
        {
          id: 'protsess',
          title: 'Etapele lucrului',
          type: 'process',
          steps: [
            { title: 'Colectarea specificației tehnice', text: 'Discutăm ideea, dorințele privind forma, metalul, pietrele. Clientul furnizează referințe sau o descriere.' },
            { title: 'Crearea modelului 3D', text: 'Designer-bijutierul creează modelul digital și îl trimite clientului pentru aprobare.' },
            { title: 'Coordonare și modificări', text: 'În această etapă facem orice schimbări — formă, dimensiune, detalii, amplasarea pietrelor.' },
            { title: 'Prototipare', text: 'Imprimarea prototipului din ceară pe imprimanta 3D pentru verificarea finală înainte de turnare.' },
            { title: 'Turnare și prelucrare finală', text: 'Turnarea în metalul ales, lustruire, montarea pietrelor, control de calitate.' }
          ]
        }
      ],
      faq: [
        { q: 'Se poate face o bijuterie după o fotografie?', a: 'Da, modelarea 3D permite recrearea unei bijuterii după fotografie cu mare precizie. Este și instrumentul principal pentru fabricarea bijuteriilor pereche sau a copiilor exacte.' },
        { q: 'Cât timp durează crearea unui model?', a: 'De obicei de la 3 la 7 zile lucrătoare, în funcție de complexitate. După aprobare, turnarea și prelucrarea finală durează încă 15–20 de zile.' },
        { q: 'Ce este specificația tehnică și ce trebuie inclus?', a: 'ST este descrierea bijuteriei dvs.: formă, dimensiune, metal, pietre, stilul dorit. Cu cât mai multe detalii, cu atât modelul este mai precis. Dacă aveți dificultăți — spuneți doar ideea, meșterul va ajuta.' }
      ]
    }
  },

  {
    slug: 'izgotovlenie',
    urlPath: '/uslugi-masterskoj/izgotovlenie-yuvelirnyx-izdelij-po-foto-eskizu-ili-obrazcu/',
    image: '/assets/articles_images/izgotovlenie.webp',
    icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>`,
    ru: {
      tag: 'Изготовление на заказ',
      readTime: '4 мин',
      title: 'Изготовление украшений по фото, эскизу или образцу',
      excerpt: 'Воплощаем любую идею в драгоценном металле — по вашей фотографии, эскизу или описанию. Срок изготовления 20–25 рабочих дней. Все изделия клеймятся в Государственной пробирной палате.',
      lead: 'Ювелирный салон Adamas Gold предлагает клиентам возможность заказать украшение по своим пожеланиям. Вы можете предоставить собственный эскиз, фотографию из интернета или образец — наши мастера воплотят задумку в реальность.',
      toc: [
        { id: 'vozmozhnosti', label: 'Что можно заказать' },
        { id: 'uslugi', label: 'Варианты заказа' },
        { id: 'protsess', label: 'Этапы изготовления' },
        { id: 'faq', label: 'Вопросы и ответы' }
      ],
      sections: [
        {
          id: 'vozmozhnosti',
          title: 'Что можно заказать',
          type: 'text',
          paragraphs: [
            'Мы изготавливаем украшения из жёлтого, белого и розового золота 585 и 750 пробы, а также из серебра 925 пробы. Выбор камней — бриллианты, сапфиры, изумруды, рубины и другие натуральные и синтетические камни.',
            'Готовые изделия клеймятся в Государственной пробирной палате — вы получаете сертифицированное украшение с официальным подтверждением качества металла. Доставка по всей Молдове.'
          ]
        },
        {
          id: 'uslugi',
          title: 'Варианты заказа',
          type: 'list',
          items: [
            { title: 'По фотографии', text: 'Присылайте фото — из интернета, из журнала, старое фото украшения. Воссоздадим точную копию или адаптируем под ваш вкус.' },
            { title: 'По эскизу', text: 'Если у вас есть идея на бумаге — мастер переведёт её в точную техническую модель. Эскиз может быть самым простым.' },
            { title: 'По образцу', text: 'Принесите украшение-образец — мы создадим точную копию или украшение в похожем стиле из выбранного вами металла.' },
            { title: 'По вашей идее', text: 'Опишите словами — наш дизайнер предложит варианты и создаст эскиз, который вы утвердите перед производством.' }
          ]
        },
        {
          id: 'callout1',
          type: 'callout',
          text: 'Постоянным клиентам предоставляются скидки. Доставка готового украшения возможна по всей Молдове. Все изделия сопровождаются гарантией качества.'
        },
        {
          id: 'protsess',
          title: 'Этапы изготовления',
          type: 'process',
          steps: [
            { title: 'Консультация', text: 'Вы предоставляете фото, эскиз или описание. Обсуждаем металл, пробу, камни, размер и стоимость.' },
            { title: '3D моделирование', text: 'Создаём цифровую модель украшения и согласовываем с вами — вносим любые правки до литья.' },
            { title: 'Изготовление', text: 'Литьё в выбранном металле, закрепка камней, полировка. Срок — 20–25 рабочих дней.' },
            { title: 'Клеймение', text: 'Готовое изделие проходит клеймение в Государственной пробирной палате.' },
            { title: 'Передача', text: 'Самовывоз из мастерской в Кишинёве или доставка курьером по всей Молдове.' }
          ]
        }
      ],
      faq: [
        { q: 'Сколько стоит изготовление на заказ?', a: 'Стоимость складывается из веса металла, стоимости камней и работы мастера. Точную цену рассчитываем после согласования модели — вы всегда знаете итоговую сумму до начала производства.' },
        { q: 'Можно ли заказать парные украшения?', a: 'Да, мы изготавливаем парные кольца, серёжки и браслеты. При заказе пары стоимость работы немного ниже, чем при заказе двух изделий по отдельности.' },
        { q: 'Можно ли изменить дизайн в процессе изготовления?', a: 'Правки вносятся до начала литья — на этапе 3D модели. После согласования и начала производства изменения возможны, но могут потребовать дополнительного времени и стоимости.' }
      ]
    },
    ro: {
      tag: 'Fabricare la comandă',
      readTime: '4 min',
      title: 'Fabricarea bijuteriilor după fotografie, schiță sau mostră',
      excerpt: 'Realizăm orice idee în metal prețios — după fotografia, schița sau descrierea dvs. Termenul de fabricare — 20–25 zile lucrătoare. Toate bijuteriile sunt marcate la Camera de Stat a Probelor.',
      lead: 'Salonul de bijuterii Adamas Gold oferă clienților posibilitatea de a comanda o bijuterie conform dorințelor proprii. Puteți furniza propria schiță, o fotografie de pe internet sau o mostră — meșterii noștri vor transforma ideea în realitate.',
      toc: [
        { id: 'vozmozhnosti', label: 'Ce se poate comanda' },
        { id: 'uslugi', label: 'Variante de comandă' },
        { id: 'protsess', label: 'Etapele fabricării' },
        { id: 'faq', label: 'Întrebări și răspunsuri' }
      ],
      sections: [
        {
          id: 'vozmozhnosti',
          title: 'Ce se poate comanda',
          type: 'text',
          paragraphs: [
            'Fabricăm bijuterii din aur galben, alb și roz de 585 și 750 de miimi, precum și din argint de 925 de miimi. Alegerea pietrelor — diamante, safire, smaralde, rubine și alte pietre naturale și sintetice.',
            'Bijuteriile finite sunt marcate la Camera de Stat a Probelor — primiți o bijuterie certificată cu confirmare oficială a calității metalului. Livrare în toată Moldova.'
          ]
        },
        {
          id: 'uslugi',
          title: 'Variante de comandă',
          type: 'list',
          items: [
            { title: 'După fotografie', text: 'Trimiteți o fotografie — de pe internet, din revistă, o fotografie veche a bijuteriei. Vom recrea o copie exactă sau o vom adapta după gustul dvs.' },
            { title: 'După schiță', text: 'Dacă aveți o idee pe hârtie — meșterul o va transforma într-un model tehnic precis. Schița poate fi cât de simplă.' },
            { title: 'După mostră', text: 'Aduceți o bijuterie-mostră — vom crea o copie exactă sau o bijuterie în stil similar din metalul ales de dvs.' },
            { title: 'După ideea dvs.', text: 'Descrieți în cuvinte — designerul nostru va propune variante și va crea o schiță pe care o veți aproba înainte de producție.' }
          ]
        },
        {
          id: 'callout1',
          type: 'callout',
          text: 'Clienților fideli li se acordă reduceri. Livrarea bijuteriei finite este posibilă în toată Moldova. Toate bijuteriile sunt însoțite de garanție de calitate.'
        },
        {
          id: 'protsess',
          title: 'Etapele fabricării',
          type: 'process',
          steps: [
            { title: 'Consultație', text: 'Furnizați fotografia, schița sau descrierea. Discutăm metalul, titlul, pietrele, dimensiunea și costul.' },
            { title: 'Modelare 3D', text: 'Creăm modelul digital al bijuteriei și îl coordonăm cu dvs. — facem orice modificări înainte de turnare.' },
            { title: 'Fabricarea', text: 'Turnarea în metalul ales, montarea pietrelor, lustruire. Termen — 20–25 zile lucrătoare.' },
            { title: 'Marcare', text: 'Bijuteria finită trece prin marcare la Camera de Stat a Probelor.' },
            { title: 'Predarea', text: 'Ridicare personală din atelier în Chișinău sau livrare cu curier în toată Moldova.' }
          ]
        }
      ],
      faq: [
        { q: 'Cât costă fabricarea la comandă?', a: 'Costul constă din greutatea metalului, costul pietrelor și munca meșterului. Prețul exact îl calculăm după aprobarea modelului — știți întotdeauna suma finală înainte de începerea producției.' },
        { q: 'Se pot comanda bijuterii pereche?', a: 'Da, fabricăm inele, cercei și brățări pereche. La comanda unei perechi, costul manoperei este puțin mai mic decât la comanda a două piese separat.' },
        { q: 'Se poate modifica designul în procesul de fabricare?', a: 'Modificările se fac înainte de începerea turnării — în etapa modelului 3D. După aprobare și începerea producției, schimbările sunt posibile, dar pot necesita timp și cost suplimentar.' }
      ]
    }
  }
];
