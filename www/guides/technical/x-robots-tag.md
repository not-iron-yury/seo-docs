<Breadcrumb title=""/>

# X-Robots-Tag

<div class="text-block text-block--warning">
  <p>Предлагаемые решения не протестированы. Такие штуки никогда не работают с первого раза. Используй как пример и подсказку. Включай голову.</p>
</div>

<!-- --- -->

## Как работает X-Robots-Tag

Заголовок передаётся в HTTP-ответе:

<div class="text-block text-block--info">
  <p>X-Robots-Tag: noindex, nofollow</p>
</div>

По сути - это аналог:

```html
<head>
  <meta name="robots" content="noindex, nofollow" />
</head>
```

Но применяется на уровне сервера, поэтому подходит для:

- application/pdf
- application/json
- text/csv
- image/\*
- application/xml
- и любых других MIME-типов

<!-- --- -->

## Где указывается

### Вариант 1 - внутри HTML

```html
<head>
  <meta name="robots" content="noindex, nofollow" />
</head>
```

<div class="text-block text-block--info">
  <p>Работает только для HTML.</p>
</div>

### Вариант 2 - HTTP-заголовок (предпочтительный)

```http
HTTP/1.1 200 OK
X-Robots-Tag: noindex, nofollow
Content-Type: text/html
```

<div class="text-block text-block--info">
  <p>noindex → страница не попадает в индекс.</p>
  <p>nofollow → ссылки на странице не передают вес.</p>
</div>

<p>Применяется на уровне сервера. </p>

<!-- --- -->

## Основные директивы

Чаще всего используются:

| Директива      | Значение                         |
| -------------- | -------------------------------- |
| `noindex`      | не индексировать файл            |
| `nofollow`     | не учитывать ссылки внутри       |
| `noimageindex` | не индексировать как изображение |
| `nosnippet`    | не показывать сниппет            |
| `noarchive`    | не кэшировать                    |
| `max-age=0`    | не хранить в кэше поисковика     |

<div class="text-block text-block--tip">
  <p>Для API и служебных файлов чаще всего используют: noindex, nofollow, noarchive</p>
</div>

<!-- --- -->

## Nginx

Запретить индексацию PDF

```Nginx
location ~* \.pdf$ {
    add_header X-Robots-Tag "noindex, nofollow, noarchive";
}
```

Для JSON API

```Nginx
location /api/ {
    add_header X-Robots-Tag "noindex, nofollow, noarchive";
}
```

Важно: если есть try_files, proxy_pass, fastcgi_pass, нужно использовать:

```Nginx
  add_header X-Robots-Tag "noindex" always;
```

## Apache

Через .htaccess

```Apache
<FilesMatch "\.(pdf|csv|json)$">
    Header set X-Robots-Tag "noindex, nofollow"
</FilesMatch>
```

Для API:

```Apache
<Directory "/var/www/site/api">
    Header set X-Robots-Tag "noindex, nofollow"
</Directory>
```

Для работы директив Header set … в Apache нужно, чтобы модуль mod_headers был активирован на сервере. Без него Apache просто проигнорирует эти строки или выдаст ошибку при старте.

## Node.js (Express)

```JS
app.use('/api', (req, res, next) => {
  res.set('X-Robots-Tag', 'noindex, nofollow, noarchive');
  next();
});
```

Для PDF:

```JS
app.get('/report.pdf', (req, res) => {
  res.set('X-Robots-Tag', 'noindex, nofollow');
  res.sendFile('/path/report.pdf');
});
```

## Django

```Python
response["X-Robots-Tag"] = "noindex, nofollow"
```

## Laravel

```PHP
return response($content)
    ->header('X-Robots-Tag', 'noindex, nofollow');
```

<!-- --- -->

## Когда X-Robots-Tag лучше robots.txt

robots.txt:

- блокирует обход
- но не гарантирует удаление из индекса

X-Robots-Tag: noindex:

- гарантированно запрещает индексирование
- работает даже если файл уже проиндексирован

Правильная стратегия:

- для API → X-Robots-Tag
- для служебных CSV → X-Robots-Tag
- для медиа → комбинировать с robots.txt

<!-- --- -->

## Типичные ошибки

1.  Добавляется заголовок только на 200 OK
    → нужно always в Nginx

2.  Ставится Disallow в robots.txt с расчетом, что файл удалится
    → он может остаться в индексе без контента

3.  Добавляется meta robots в PDF → не работает

4.  Ставится noindex на CDN, но не на origin

<!-- --- -->

## SEO для production

Рекомендованный подход:
| Тип контента | Что делать |
| -------------------------- | ------------------------------ |
| `/api/*` | `noindex, nofollow, noarchive` |
| `/exports/*.csv` | `noindex, noarchive` |
| `/media/private/*` | `noindex, noimageindex` |
| публичные PDF (whitepaper) | оставить индексируемыми |
