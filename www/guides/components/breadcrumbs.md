<Breadcrumb title="Хлебные крошки"/>

# Хлебные крошки (Breadcrumbs) {#breadcrumbs}

<ul class="info-block">
  <li class="info-block-itm">Тип компонента: Навигационные элементы</li>
  <li class="info-block-itm">SEO-риск: Средний </li>
  <li class="info-block-itm">Критично для: Внутренней перелинковки</li>
</ul>

Хлебные крошки показывают положение страницы в иерархии сайта и передают ссылочный вес внутри сайта.

## Суть проблемы {#point}

Неправильная реализация breadcrumbs приводит к ухудшению внутренней перелинковки, а поисковые системы хуже понимают структуру сайта. Компонент хоть и простой, но часто реализовывается с ошибками:

- ссылки отсутствуют или реализованы через JavaScript
- навигация не отражает реальную структуру сайта
- отсутствует структурированная разметка

## Правильная модель {#correct-model}

- Хлебные крошки - это часть навигационной структуры сайта, а не просто визуальный элемент интерфейса.
- Компонент должен быть реализован как обычные HTML-ссылки, отражающие иерархию сайта.
- Каждый элемент цепочки должен вести на реальную страницу.

## Пример {#examples}

::: code-group

```HTML
<nav class="breadcrumbs" aria-label="Breadcrumb">
  <ol>
    <li>
      <a href="/">Главная</a>
    </li>

    <li>
      <a href="/catalog/">Каталог</a>
    </li>

    <li>
      <a href="/catalog/laptops/">Ноутбуки</a>
    </li>

    <!-- Последний элемент без ссылки! -->
    <li aria-current="page">MasBook Kek2</li>
  </ol>
</nav>
```

```CSS
.breadcrumbs ol {
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  padding: 0;
  margin: 0;
}

.breadcrumbs li + li::before {
  content: '/';
  margin: 0 5px;
}

.breadcrumbs a {
  text-decoration: none;
}

```

:::

- `<nav>` - навигация
- `<ol>` - логическая иерархия
- `<li>` - элементы списка
- `aria-current="page"` - accessibility

## Структурированные данные {#structured-data}

::: code-group

```HTML[JSON-LD]
<head>
  <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Главная",
          "item": "https://example.com/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Каталог",
          "item": "https://example.com/catalog/"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Ноутбуки",
          "item": "https://example.com/catalog/laptops/"
        },
        {
          "@type": "ListItem",
          "position": 4,
          "name": "MasBook Kek2",
          "item": "https://example.com/catalog/laptops/masbook-kek2/"
        }
      ]
    }
  </script>
<head>

<body>
  <nav class="breadcrumbs" aria-label="Breadcrumb">
    <ol>
      <li>
        <a href="/">Главная</a>
      </li>

      <li>
        <a href="/catalog/">Каталог</a>
      </li>

      <li>
        <a href="/catalog/laptops/">Ноутбуки</a>
      </li>

      <!-- Последний элемент без ссылки! -->
      <li aria-current="page">MasBook Kek2</li>
    </ol>
  </nav>
</body>

```

```HTML[Microdata]

<nav class="breadcrumbs" aria-label="Breadcrumb">
  <ol
    itemscope
    itemtype="https://schema.org/BreadcrumbList">
    <li
      itemprop="itemListElement"
      itemscope
      itemtype="https://schema.org/ListItem">
      <a itemprop="item" href="/">
        <span itemprop="name">Главная</span>
      </a>
      <meta itemprop="position" content="1" />
    </li>

    <li
      itemprop="itemListElement"
      itemscope
      itemtype="https://schema.org/ListItem">
      <a itemprop="item" href="/catalog/">
        <span itemprop="name">Каталог</span>
      </a>
      <meta itemprop="position" content="2" />
    </li>

    <li
      itemprop="itemListElement"
      itemscope
      itemtype="https://schema.org/ListItem">
      <a itemprop="item" href="/catalog/laptops/">
        <span itemprop="name">Ноутбуки</span>
      </a>
      <meta itemprop="position" content="3" />
    </li>

    <li
      itemprop="itemListElement"
      itemscope
      itemtype="https://schema.org/ListItem"
      aria-current="page"
    >
      <!-- Последний элемент без ссылки! -->
      <span itemprop="name">MasBook Kek2</span>
      <meta itemprop="position" content="4" />
    </li>
  </ol>
</nav>

```

:::

<div class="text-block text-block--tip mt-30">
  <p>JSON-LD - использует строго абсолютные URL.</p>
  <p>Microdata - часто относительные, но лучше также использовать абсолютные.</p>
</div>

## Как не нужно {#how-not-to}

<ul class="list-reset">
  <li>❌ Реализовывать компонент через JS-навигацию (onclick)</li>
  <li>❌ Использовать div вместо ссылок</li>
  <li>❌ Делать элементы цепочки без URL</li>
  <li>❌ Генерировать компонент только на клиенте</li>
  <li>❌ Отображать структуру, не соответствующую реальной иерархии сайта</li>
</ul>

## Чек-лист {#checklist}

<ul class="list-reset">
  <li>✔️ Все элементы цепочки (кроме текущей страницы) - это <code>a href</code></li>
  <li>✔️ Ссылки ведут на реальные страницы сайта</li>
  <li>✔️ Breadcrumbs присутствуют в HTML страницы</li>
  <li>✔️ Структура соответствует URL и иерархии сайта</li>
  <li>✔️ Компонент отображается и работает без JavaScript</li>
  <li>✔️ Последний элемент тоже указывается, но без ссылки</li>
</ul>

### Инструменты для проверки {#tools-for-checking}

- DevTools → View Page Source
- DevTools → Network
- отключение JavaScript в браузере
