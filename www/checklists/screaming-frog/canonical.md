# Canonical {#canonical}

<ul class="info-block">
  <li class="info-block-itm">Задача: Устранить дубли и задать корректные сигналы для поисковых систем</li>
  <li class="info-block-itm">Важность: Высокая</li>
</ul>

## Когда проверять {#when}

- есть дубли страниц
- есть фильтры / параметры у URL

## Что проверять {#what-to-check}

- Canonicals
- URL

## Должно быть {#must-be}

- 100% SEO-важных страниц → self-canonical
- Дубли → canonical на основную страницу (ближайшую релевантную)

## Источник проблем {#problems}

- у SEO-важных страниц отсутствует canonical
- у SEO-важных страниц нерелевантный canonical
- фильтры без SEO-ценности с self-canonical
- все страницы пагинации имеют в canonical URL на page 1

<div class="text-block text-block--info mt-30">
  <p>Если паттерн подтверждается → поисковик получает противоречивые сигналы</p>
</div>

| Паттерн                | Что ломается                 |
| ---------------------- | ---------------------------- |
| canonical → не туда    | страница выпадает из индекса |
| нет canonical          | неконтролируемые дубли       |
| фильтры self-canonical | появляется множество URL     |
| pagination → page 1    | не индексируется глубина     |

## Что делать {#to-do}

- Выстроить canonical-иерархию
- Убрать конфликтующие сигналы

## Ссылки {#links}

- <a href="/docs/technical-seo/canonical.html">Рекомендации по работе с canonical</a>
