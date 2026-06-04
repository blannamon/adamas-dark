-- Создать таблицу товаров
CREATE TABLE products (
  id          integer PRIMARY KEY,
  category    text    NOT NULL,
  title_ru    text    NOT NULL,
  title_ro    text    NOT NULL,
  type_ru     text    NOT NULL,
  type_ro     text    NOT NULL,
  material_ru text    NOT NULL,
  material_ro text    NOT NULL,
  stones_ru   text    NOT NULL,
  stones_ro   text    NOT NULL,
  visual      text,
  popular     integer DEFAULT 0
);

-- Включить публичное чтение (RLS)
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public read" ON products FOR SELECT USING (true);

-- Вставить текущие товары
INSERT INTO products (id, category, title_ru, title_ro, type_ru, type_ro, material_ru, material_ro, stones_ru, stones_ro, visual, popular) VALUES
(1024, 'ring',      'Модель 1024', 'Model 1024', 'Кольцо',            'Inel',             'розовое золото 585',    'aur roz 585',    'с бриллиантами',     'cu diamante',         'ring rose',        9),
(2057, 'ring',      'Модель 2057', 'Model 2057', 'Кольцо',            'Inel',             'белое золото 585',      'aur alb 585',    'с бриллиантом',      'cu diamant',          'ring white gold',  8),
(3011, 'signet',    'Модель 3011', 'Model 3011', 'Печатка',           'Inel barbatesc',   'жёлтое золото 585',     'aur galben 585', 'с ониксом',          'cu onix',             'signet gold',      10),
(4008, 'pendant',   'Модель 4008', 'Model 4008', 'Подвеска',          'Pandantiv',        'белое золото 585',      'aur alb 585',    'с бриллиантами',     'cu diamante',         'pendant silver',   7),
(5012, 'earrings',  'Модель 5012', 'Model 5012', 'Серьги',            'Cercei',           'розовое золото 585',    'aur roz 585',    'с фианитами',        'cu zirconii',         'earrings rose',    6),
(6003, 'bracelet',  'Модель 6003', 'Model 6003', 'Браслет',           'Bratara',          'жёлтое золото 585',     'aur galben 585', 'византийское плетение', 'impletitura bizantina', 'bracelet gold', 8),
(1033, 'exclusive', 'Модель 1033', 'Model 1033', 'Эксклюзивное кольцо', 'Inel exclusiv',  'платина 950',           'platina 950',    'с бриллиантами',     'cu diamante',         'ring platina',     10),
(5021, 'earrings',  'Модель 5021', 'Model 5021', 'Серьги',            'Cercei',           'белое золото 585',      'aur alb 585',    'с бриллиантами',     'cu diamante',         'earrings white gold', 7),
(7108, 'chain',     'Модель 7108', 'Model 7108', 'Цепь',              'Lant',             'жёлтое золото 585',     'aur galben 585', 'якорное плетение',   'impletitura ancora',  'chain gold',       5),
(8114, 'cross',     'Модель 8114', 'Model 8114', 'Крестик',           'Cruce',            'белое золото 585',      'aur alb 585',    'с гравировкой',      'cu gravura',          'cross white gold', 6),
(8120, 'cross',     'Модель 8120', 'Model 8120', 'Иконка',            'Iconita',          'жёлтое золото 585',     'aur galben 585', 'ручная доработка',   'finisaj manual',      'pendant gold',     5),
(9302, 'exclusive', 'Модель 9302', 'Model 9302', 'Авторский комплект', 'Set exclusiv',    'комбинированное золото', 'aur combinat',  'с сапфирами',        'cu safire',           'ring gold',        9);
