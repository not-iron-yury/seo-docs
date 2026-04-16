# Пагинация {#pagination}

<ul class="info-block">
  <li class="info-block-itm">Задача: Контроль индексации пагинации</li>
  <li class="info-block-itm">Важность: Высокая</li>
</ul>

## Что проверять {#what-to-check}

- URL
- URL → Canonical
- URL → Indexability

## Должно быть {#must-be}

В зависимости от стратегии:

1. страницы пагинации индексируются
2. либо все страницы пагинации (кроме первой) → noindex + canonical на `page-1`

## Источник проблем {#problems}

- вся пагинация не индексируется
- или наоборот - индексируется "мусор"

## Действия {#actions}

Выбрать стратегию:

- индексируемая пагинация
- или неиндексируемая (noindex + canonical)

## Ссылки {#links}

- <a href="/guides/components/pagination.html">Компонент "Пагинация" - технический гайд </a>
- тут должна быть ссылка на SEO-гайд по пагинации
