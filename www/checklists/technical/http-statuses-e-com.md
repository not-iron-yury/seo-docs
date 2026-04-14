<Breadcrumb title="HTTP статусы для e-commerce"/>

# Чек-лист: Проверка статусов HTTP для e-commerce

Динамические страницы, фильтры, пагинация.

<!-- --------- -->

## 1. Главные страницы {#1}

<ul class='list-reset'>
  <li>1-1. Главная, категории, карточки товаров - 200 OK</li>
  <li>1-2. Проверка <code>www/non-www</code> и <code>http/https</code> версий</li>
  <li>1-3. Редирект при смене домена или протокола: 301 постоянный</li>
</ul>

<div class="text-block text-block--tip mt-30">
  <p><strong>Практическая рекомендация:</strong></p>
  <p>Каждая каноническая страница должна отдавать 200 и быть доступной для краулеров.</p>
</div>

<!-- --------- -->

## 2. Пагинация и сортировка {#2}

<ul class='list-reset'>
  <li>2-1. Страницы пагинации (page=2,3…) - <code>200 OK</code></li>
  <li>2-2. Фильтры и сортировки (например <code>?color=red&sort=price</code>) - <code>200 OK</code>, но желательно <code>canonical</code> на основную категорию</li>
  <li>2-3. Нет дублирующего контента без <code>canonical</code> или <code>noindex</code></li>
  <li>2-4. Проверка редиректов на несуществующие номера страниц (например page > max) - <code>404</code> или <code>410</code></li>
</ul>

<div class="text-block text-block--warning mt-30">
  <p>Подводные камни:</p> 
  <ul>
    <li>Поисковик может индексировать все варианты фильтров → дубли.</li>
    <li>Soft 404 при пустых фильтрах.</li>
  </ul>
</div>

<!-- --------- -->

## 3. Продукты {#3}

<ul class='list-reset'>
  <li>3-1. Удаленные товары - <code>410 Gone</code></li>
  <li>3-2. Товары временно недоступные - <code>404/301</code> на категорию или <code>200</code> с заглушкой + <code>noindex</code></li>
  <li>3-3. URL с <code>/?utm\_\*, /?ref=</code> - редирект на каноническую страницу или игнорирование параметров сервером (просто обрабатывает страницу как обычную)</li>
</ul>

<!-- --------- -->

## 4. Фильтры и динамический контент {#4}

<ul class='list-reset'>
  <li>4-1. Проверка параметрических URL - в индексе должны быть только SEO-значимые</li>
  <li>4-2. Проверка, что динамические страницы не создают бесконечные цепочки редиректов</li>
  <li>4-3. Проверка canonical и noindex на фильтрах, если они не нужны в индексе</li>
</ul>

<div class="text-block text-block--tip mt-30">
  <p>Параметры должны быть управляемыми → либо через canonical, либо через robots/meta, чтобы не индексировались дубли.</p>
</div>

<!-- --------- -->

## Таблица для аудита e-commerce HTTP статусов {#table}

| URL                                              | Тип страницы / назначение | Ожидаемый статус | Реальный статус | Canonical    | Action / комментарий                         |
| ------------------------------------------------ | ------------------------- | ---------------- | --------------- | ------------ | -------------------------------------------- |
| `https://example.com/`                           | Главная                   | 200              | 200             | /            | ОК                                           |
| `https://example.com/category/`                  | Категория                 | 200              | 200             | /category/   | ОК                                           |
| `https://example.com/category/page/2`            | Пагинация                 | 200              | 200             | /category/   | ОК, проверить LCP/CLS                        |
| `https://example.com/category/?sort=price`       | Фильтр                    | 200              | 200             | /category/   | Canonical на категорию, чтобы не дублировать |
| `https://example.com/product/123`                | Товар                     | 200              | 200             | /product/123 | ОК                                           |
| `https://example.com/product/123?utm_source=ads` | Товар с параметром        | 200              | 200             | /product/123 | Проверить редирект или canonical             |
| `https://example.com/product/999`                | Удаленный товар           | 410              | 200             | /            | Исправить на 410 или 301 на категорию        |
| `https://example.com/category/page/999`          | Пагинация несуществующая  | 404              | 200             | /            | Исправить на 404/410                         |
| `https://example.com/category/?color=red&size=m` | Фильтр комбинация         | 200              | 200             | /category/   | Проверить canonical и noindex                |
| `https://example.com/old-page`                   | Устаревшая страница       | 301              | 200             | /new-page    | Исправить редирект на 301 к новой странице   |
| `https://example.com/page-not-found`             | Soft 404                  | 404/410          | 200             | /            | Исправить на настоящий 404/410               |
| `https://example.com/category/?ref=affiliate`    | Параметр партнерский      | 200              | 200             | /category/   | Добавить canonical, чтобы не индексировалось |

## Инструменты {#tools}

- Screaming Frog SEO Spider (с параметрами crawl URL)
- Netpeak Spider (отдельная проверка параметров URL)
- Ahrefs Site Audit
- Sitebulb (URL parameters + status check)
- Google Search Console
- Яндекс Вебмастер (Индексирование)
- curl / Insomnia (Postman) для выборочных проверок
