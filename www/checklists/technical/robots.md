# Чек-лист: Индексации страниц (robots.txt, meta robots)

<!-- --------- -->

<div class="text-block">
  <p>Настройка индексации считается корректной, если:</p>

- поисковые боты могут обходить все SEO-важные страницы
- служебные и технические страницы не участвуют в индексации
- robots.txt, meta robots и X-Robots-Tag не создают конфликтующих сигналов
- в индексе поисковых систем присутствуют только страницы с SEO-ценностью
</div>

<!-- --------- -->

## 1. Файл robots.txt {#1}

<ul class='list-reset'>
  <li>1-1. Файл доступен по <code>/robots.txt</code> и возвращает статус 200</li>
  <li>1-2. Директивы <code>Disallow</code> и <code>Allow</code> применяются корректно</li>
  <li>1-3. Нет опечаток в <code>User-agent</code>, <code>Disallow</code>, <code>Allow</code></li>
  <li>1-4. Указан актуальный sitemap -> <code>Sitemap: https://example.com/sitemap.xml</code> </li>
  <li>1-5. Проверить синтаксис через инструменты Google / Яндекс </li>
  <li>1-6. Нет конфликтующих правил </li>
</ul>

<div class="text-block text-block--tip mt-30">
  <p>Правила robots.txt должны однозначно определять, какие URL можно и нельзя обходить.</p>
</div>

<!-- --------- -->

## 2. meta robots {#2}

<ul class='list-reset'>
  <li>2-1. На индексируемых страницах отсутствует <code>noindex</code></li>
  <li>2-2. На служебных страницах используется <code>noindex</code></li>
  <li>2-3. Нет конфликтов с <code>robots.txt</code> (страница доступная для сканирования в <code>robots.txt</code> - не должна иметь запрещающий тег, и наоборот)</li>
  <li>2-4. Нет конфликтующих значений (<code>index</code> и <code>noindex</code>)</li>
  <li>2-5. Тег meta robots расположен в <code>head</code></li>
</ul>

<div class="text-block text-block--tip mt-30">
  <p>Тег meta robots должен корректно управлять индексацией отдельных страниц.</p>
</div>

<!-- --------- -->

## 3. X-Robots-Tag (HTTP-заголовки) {#3}

<ul class='list-reset'>
  <li>3-1. Для PDF, изображений и файлов установлены корректные теги (noindex при необходимости)</li>
  <li>3-2. Нет конфликтов с <code>robots.txt</code> и <code>meta robots</code></li>
  <li>3-3. Нет случайных <code>noindex</code> в заголовках сервера</li>
</ul>

<div class="text-block text-block--tip mt-30">
  <p><code>X-Robots-Tag</code> используется для управления индексацией ресурсов, где невозможно добавить <code>meta robots</code>. Реализуется на сервере.</p>
</div>

<div class="text-block mt-30">
  <p>Подробности и варианты настроек смотри в разделе гайдов<a href='/guides/technical/x-robots-tag'>: X-Robots-Tag</a>.</p>
</div>

<!-- --------- -->

## 4. Закрытые разделы сайта {#4}

<ul class='list-reset'>
  <li>4-1. Закрыты служебные разделы (админка, корзина, личный кабинет)</li>
  <li>4-2. Закрыты технические URL (поиск, параметры сортировки, служебные страницы)</li>
  <li>4-3. Закрыты дублирующие разделы сайта</li>
</ul>

<div class="text-block text-block--tip mt-30">
  <p>В <code>robots.txt</code> должны быть закрыты разделы, которые не имеют SEO-ценности.</p>
</div>

<!-- --------- -->

## 5. Блокировка важных страниц {#5}

<ul class='list-reset'>
  <li>5-1. robots.txt не блокирует страницы, которые должны индексироваться</li>
  <li>5-2. robots.txt не блокирует CSS и JavaScript</li>
  <li>5-3. robots.txt не блокирует изображения, если они важны для рендеринга</li>
</ul>

<div class="text-block text-block--tip mt-30">
  <p>Поисковые боты должны иметь возможность загрузить ресурсы, необходимые для рендеринга страницы.</p>
</div>

<!-- --------- -->

## 6. Индексация в поисковых системах {#41}

<ul class='list-reset'>
<li>6-1. Статус страниц проверен в Google Search Console / Яндекс.Вебмастер</li>
<li>6-2. Важные страницы индексируются, закрытые - отсутствуют в индексе</li>
<li>6-3. Нет «пустых» URL в индексе (закрытые <code>robots.txt</code>, но ссылки есть)</li>
</ul>

<div class="text-block text-block--tip mt-30">
  <p>Поисковый индекс должен содержать только страницы, представляющие SEO-ценность.</p>
</div>

<!-- --------- -->

## 7. Согласованность сигналов {#7}

<ul class='list-reset'>
  <li>7-1. robots.txt не блокирует страницы с noindex</li>
  <li>7-2. robots.txt не блокирует страницы, указанные в sitemap</li>
  <li>7-3. canonical не указывает на страницы, закрытые от индексации</li>
</ul>

<div class="text-block text-block--tip mt-30">
  <p>Все технические сигналы должны быть согласованы между собой.</p>
</div>

<!-- --------- -->

## Подводные камни {#hints}

- <strong>Блокировка страницы в robots.txt + noindex.</strong> Если страница закрыта в robots.txt, поисковик может не увидеть noindex.
- <strong>Блокировка CSS и JS.</strong> Это может нарушить корректный рендеринг страницы поисковым ботом.
- <strong>Ошибки в robots.txt.</strong> Неправильное использование \* может закрыть весь сайт.
- <strong>CMS автоматически добавляет noindex.</strong> Иногда это происходит на страницах пагинации или фильтров.
- <strong>Страницы могут попадать в индекс без обхода.</strong> Если на них есть внешние ссылки.
- <strong>Несогласованность robots.txt и sitemap.</strong> В sitemap могут находиться страницы, закрытые от обхода.

<!-- --------- -->

## Инструменты {#tools}

- Яндекс.Вебмастер
- Google Search Console
- Screaming Frog SEO Spider
