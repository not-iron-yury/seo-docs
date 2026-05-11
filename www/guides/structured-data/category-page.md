# Категория товаров {#category-page}

<ul class="info-block">
  <li class="info-block-itm">Тип компонента: Листинг / Категория</li>
  <li class="info-block-itm">SEO-риск: Высокий</li>
  <li class="info-block-itm">Критично для: Индексации товаров, понимания структуры каталога</li>
</ul>

<br>
Разметка ItemList не усиливая SEO напрямую, но помогает поисковым системам правильно интерпретировать структуру каталога. Это скорее структурный сигнал, чем фактор ранжирования сам по себе.

ItemList реально полезна для больших каталогов, e-commerce, маркетплейсов, категорий с пагинацией и SEO-важных листингов.

И почти бесполезна для маленьких сайтов с несколькими товарами на странице категории, для простых витрин и сайтов услуг.

## Суть проблемы {#point}

<strong>Основная проблема</strong> - категории товаров зачастую реализуются как обычный список карточек без структурированных данных.

В результате поисковая система:

- хуже понимает структуру каталога
- слабее связывает товары между собой
- хуже интерпретирует листинг как коллекцию товаров

<strong>Дополнительная проблема</strong> - динамическая подгрузка товаров, при которой часть каталога отсутствует в HTML.

## Правильная модель {#correct-model}

<ol>
  <li>Категория - это не просто UI-сетка карточек.</li>
  <li>Для поисковой системы это самостоятельная сущность, коллекция связанных товаров, часть иерархии каталога.</li>
  <li>Категория должна быть:
    <ul>
      <li>полноценной индексируемой страницей</li>
      <li>содержать список товаров в HTML</li>
      <li>иметь структурированные данные типа ItemList</li>
    </ul>
  </li>
  <li>ItemList должен описывать реальные товары, присутствующие в HTML страницы.</li>
</ol>

## Когда ItemList не нужен {#not-needed}

Можно не использовать ItemList, если:

- это очень маленький каталог
- листинг не имеет SEO-ценности
- товары отображаются случайно или персонализированно
- список является purely UX-блоком (“похожие товары”, “вы недавно смотрели”)

## Примеры {#examples}

Минимальный пример.

::: code-group

```HTML
<body>
  <section class="catalog">

    <article class="product-card">
      <a href="/product-1">
        <img src="/img/product-1.jpg" alt="Ноутбук Lenovo">
        <h2>Ноутбук Lenovo</h2>
        <p>79 990 ₽</p>
      </a>
    </article>

    <article class="product-card">
      <a href="/product-2">
        <img src="/img/product-2.jpg" alt="Ноутбук ASUS">
        <h2>Ноутбук ASUS</h2>
        <p>89 990 ₽</p>
      </a>
    </article>

  </section>
</body>
```

```HTML [JSON-LD (ItemList)]
<head>
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Ноутбуки",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "url": "https://example.com/product-1"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "url": "https://example.com/product-2"
      }
    ]
  }
  </script>
</head>
```

:::

<div class="text-block text-block--info mt-30">
  <p>Для большинства случаев достаточно минимального набора свойств ListItem - <code>@type</code>, <code>position</code>, <code>url</code>. Минимальная корректная schema почти всегда лучше, чем "богатая", но нестабильная.</p>
  
  <p>Большее количество свойств  усложняют SSR, увеличивает вероятность рассинхрона данных и появления ошибок. </p>

</div>

<br>
Пример для Nuxt / SSR

```VUE
<script setup>
const products = [
  {
    name: 'Ноутбук Lenovo',
    url: 'https://example.com/product-1'
  },
  {
    name: 'Ноутбук ASUS',
    url: 'https://example.com/product-2'
  }
]

useHead({
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: "Ноутбуки",
        itemListElement: products.map((product, index) => ({
          "@type": "ListItem",
          position: index + 1,
          url: product.url
        }))
      })
    }
  ]
})
</script>
```

<div class="text-block text-block--info mt-30">
  <p>⚠️ Очень важно:</p>

- список товаров должен рендериться сервером (SSR)
- товары должны присутствовать в HTML
- ItemList должен отражать фактический порядок товаров в DOM (HTML)
- сортировка/фильтрация → изменяют и HTML, и schema
</div>

## Как не нужно {#how-not-to}

<ul class="list-reset">
  <li>❌ Рендерить товары только после JS-загрузки</li>
  <li>❌ Делать пустую HTML-страницу с последующей гидрацией каталога</li>
  <li>❌ Размечать товары, отсутствующие на странице</li>
  <li>❌ Нарушать порядок position</li>
  <li>❌ Использовать ItemList для бесконечной ленты без пагинации</li>
  <li>❌ Размечать скрытые / lazy-loaded товары, которых нет в DOM</li>
</ul>

## Чек-лист {#checklist}

<ul class="list-reset">
  <li>✔️ Товары присутствуют в HTML страницы </li>
  <li>✔️ ItemList присутствует в исходном коде </li>
  <li>✔️ position соответствует порядку карточек </li>
  <li>✔️ URL товаров корректны </li>
  <li>✔️ Страница проходит structured data validation</li>
</ul>

## Инструменты проверки {#checking-tools}

- <a href="https://search.google.com/test/rich-results" rel="nofollow noreferrer" target=_blank>Google Rich Results Test</a>
- DevTools → View Source
- DevTools → Network

## Ссылки {#links}

- <a href="https://schema.org/ListItem" rel="nofollow noreferrer" target=_blank>ListItem - Schema.org Type</a>
