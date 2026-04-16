# Фильтры (критично для e-commerce) {#filters}

<ul class="info-block">
  <li class="info-block-itm">Задача: Контроль индексации параметрических URL</li>
  <li class="info-block-itm">Важность: Высокая</li>
</ul>

## Что проверять {#what-to-check}

- URL
- Indexability
- дубли URL
- бесконечные комбинации URL

## Должно быть {#must-be}

Четкое разделение:

- White list → indexable
- Gray list → по ситуации
- Black list → noindex

## Источник проблем {#problems}

- нет контроля индексации
- бесконечные комбинации URL
- дубли страниц
- indexable мусор

## Действия {#actions}

Контроль индексации параметрических URL через :

- canonical
- noindex
- robots.txt

## Ссылки {#links}

- <a href="/guides/components/filters.html#rules">Индексация фильтров - Технический гайд</a>
- <a href="/docs/technical-seo/canonical.html">Рекомендации по работе с canonical</a>
