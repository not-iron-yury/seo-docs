<Breadcrumb title="Индексация"/>

# Индексация {#indexing}

<ul class="info-block">
  <li class="info-block-itm">Задача: Определить корректность индексации сайта</li>
  <li class="info-block-itm">Важность: Высокая</li>
</ul>

## Когда проверять {#when}

- страницы не попадают в индекс
- запуск нового сайта
- падение трафика

## Что проверять {#what-to-check}

- Internal
- Response Codes

<p class=mt-30><i>Фильтры:</i></p>

- HTML
- Indexable / Non-Indexable

## Должно быть {#must-be}

- 100% важных страниц → Indexable
- 0% мусорных страниц → Indexable
- Все indexable страницы → Status Code = 200

## Источник проблем {#problems}

<ol>
  <li>Важные страницы:
    <ul>
      <li>noindex</li>
      <li>canonical на другой URL</li>
    </ul>
  </li>
  <li>Мусор (фильтры, параметры) → indexable</li>
</ol>

<div class="text-block text-block--info mt-30">
  <p>Если паттерн подтверждается → нарушена стратегия индексации</p>
</div>

## Что делать {#to-do}

<ol>
  <li>Настроить:
    <ul>
      <li>meta robots</li>
      <li>canonical</li>
    </ul>
  </li>
  <li>Разделить страницы на:
    <ul>
      <li>indexable</li>
      <li>non-indexable</li>
    </ul>
  </li>
</ol>
