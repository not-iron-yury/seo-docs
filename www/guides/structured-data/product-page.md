# Карточка товара {#product-page}

<ul class="info-block">
  <li class="info-block-itm">Тип компонента: Страница (композитная сущность)</li>
  <li class="info-block-itm">SEO-риск: Высокий</li>
  <li class="info-block-itm">Критично для: Сниппетов, коммерческих факторов, индексации</li>
</ul>

## Суть проблемы {#point}

Карточка товара может:

- содержать не всю полезную информацию (без offer/ratings)
- содержать несогласованные данные (html ≠ разметка)
- генерироваться динамически (разметка не видна краулерам)

В результате:

- не формируются расширенные сниппеты
- теряется CTR
- поисковики хуже понимают коммерческие сигналы

## Правильная модель {#correct-model}

<ol>
  <li>Карточка товара должна содержать полную и согласованную структуру данных, описывающую:
    <ul>
      <li>сам товар</li>
      <li>предложение (цена, наличие)</li>
      <li>рейтинг / отзывы (если есть)</li>
    </ul>
  </li>
  <li>Разметка должна описывать реальное состояние товара, а не быть "SEO-декорацией".</li>
</ol>

<div class="text-block text-block--tip mt-30">
  <p>Карточка товара - это не просто Product, а связка нескольких сущностей.</p>
</div>

## Содержимое разметки {#priority-list}

<ol>
  <li>Высокий приоритет
    <ul>
      <li>Product</li>
      <li>Offer</li>
      <li>AggregateRating</li>
    </ul>
  </li>
  <li>Средний приоритет
    <ul>
      <li>additionalProperty</li>
      <li>shippingDetails</li>
      <li>return policy</li>
    </ul>
  </li>
  <li>Низкий приоритет
    <ul>
      <li>category</li>
      <li>color</li>
      <li>material</li>
      <li>size</li>
      <li>weight</li>
    </ul>
  </li>

</ol>

## Высокий приоритет {#high-priority}

### Product {#product}

- name
- image
- description
- sku / mpn (идентификаторы)
- brand

```HTML
<head>
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "Ноутбук Lenovo IdeaPad 5",
    "image": [
      "https://example.com/image.jpg"
    ],
    "description": "Ноутбук с экраном 15.6 дюймов и SSD 512GB",
    "sku": "12345",
    "brand": {
      "@type": "Brand",
      "name": "Lenovo"
    },
  }
  </script>
</head>
```

### Offer {#schema-offer}

Обязательно для e-commerce.

- price
- priceCurrency
- availability
- url

```JSON
"offers": {
  "@type": "Offer",
  "url": "https://example.com/product",
  "priceCurrency": "RUB",
  "price": "300.00",
  "availability": "https://schema.org/InStock"
}
```

### AggregateRating {#rating}

Если есть отзывы с рейтингами товаров.

- ratingValue
- reviewCount

```JSON
"aggregateRating": {
  "@type": "AggregateRating",
  "ratingValue": "4.5",
  "reviewCount": "24"
}
```

## Средний приоритет {#middle-priority}

### AdditionalProperty {#add-property}

Позволяет размечать отдельные характеристики товара. Полезно для техники, оборудования, мебели и т.п.

```JSON
"additionalProperty": [
  {
    "@type": "PropertyValue",
    "name": "RAM",
    "value": "16GB"
  }
]
```

### PriceValidUntil {#price-valid-until}

Срок действия цены.

```JSON
"priceValidUntil": "2026-12-31"
```

### ShippingDetails {#shipping-details}

Доставка.

```JSON
"shippingDetails": {
  "@type": "OfferShippingDetails",
  "shippingRate": {
    "@type": "MonetaryAmount",
    "value": "10",
    "currency": "USD"
  },
  "shippingDestination": {
    "@type": "DefinedRegion",
    "addressCountry": "US"
  },

  "deliveryTime": {
    "@type": "ShippingDeliveryTime",
    "handlingTime": {
      "@type": "QuantitativeValue",
      "minValue": 1,
      "maxValue": 2,
      "unitCode": "DAY"
    },
    "transitTime": {
      "@type": "QuantitativeValue",
      "minValue": 2,
      "maxValue": 5,
      "unitCode": "DAY"
    }
  }
}
```

👉 Что это означает:

- обработка заказа: 1–2 дня
- доставка: 2–5 дней
- стоимость доставки: $10
- регион доставки: США

<br>
📌 Добавляется в Offer:

```JSON
"offers": {
  "@type": "Offer",
  ...
  "shippingDetails": { ... }
}
```

### HasMerchantReturnPolicy {#return-policy}

Политика возврата.

```JSON
"hasMerchantReturnPolicy": {
  "@type": "MerchantReturnPolicy",
  "applicableCountry": "US",
  "returnPolicyCategory": "https://schema.org/MerchantReturnFiniteReturnWindow",
  "merchantReturnDays": 30,
  "returnMethod": "https://schema.org/ReturnByMail",
  "returnFees": "https://schema.org/FreeReturn"
}
```

👉 Что это означает:

- возврат доступен в США
- окно возврата: 30 дней
- возврат по почте
- бесплатный возврат

<br>
📌 Добавляется в Offer:

```JSON
"offers": {
  "@type": "Offer",
  ...
  "hasMerchantReturnPolicy": { ... }
}
```

## Низкий приоритет {#low-priority}

### Category {#schema-category}

Категория товара. Слабый сигнал, но иногда полезен.

```JSON
"category": "Ноутбуки"
```

### Color {#schema-color}

Для вариативных товаров.

```JSON
"color": "Black"
```

### Material {#schema-material}

Полезно для:

- мебели
- одежды
- аксессуаров

```JSON
"material": "Leather"
```

### Size {#schema-size}

Для одежды и обуви.

```JSON
"size": "XL"
```

### Weight {#schema-weight}

```JSON
"weight": {
  "@type": "QuantitativeValue",
  "value": "1.4",
  "unitCode": "KGM"
}
```

## Пример {#example}

Минимальная реализация (JSON-LD)

```HTML
<head>
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "Ноутбук Lenovo IdeaPad 5",
    "image": [
      "https://example.com/image.jpg"
    ],
    "description": "Ноутбук с экраном 15.6 дюймов и SSD 512GB",
    "sku": "12345",
    "brand": {
      "@type": "Brand",
      "name": "Lenovo"
    },
    "offers": {
      "@type": "Offer",
      "url": "https://example.com/product",
      "priceCurrency": "USD",
      "price": "799.00",
      "availability": "https://schema.org/InStock"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.5",
      "reviewCount": "24"
    }
  }
  </script>
</head>
```

## Как не нужно {#how-not-to}

<ul class="list-reset">
  <li>❌ Указывать цену в разметке, если её нет на странице</li>
  <li>❌ Размечать рейтинг без реальных отзывов</li>
  <li>❌ Использовать фейковые reviewCount</li>
  <li>❌ Не обновлять цену / наличие</li>
  <li>❌ Генерировать JSON-LD только на клиенте (CSR)</li>
  <li>❌ Делать одну разметку для всех вариантов товара</li>
</ul>

## Чек-лист {#checklist}

<ul class="list-reset">
  <li>✔️ JSON-LD есть в исходном HTML </li>
  <li>✔️ Цена совпадает с отображаемой </li>
  <li>✔️ Наличие соответствует реальному </li>
  <li>✔️ Разметка не дублируется </li>
  <li>✔️ Нет ошибок в structured data </li>
</ul>

## Инструменты проверки {#checking-tools}

- <a href="https://search.google.com/test/rich-results" rel="nofollow noreferrer" target=_blank>Google Rich Results Test</a>
- DevTools → Elements / View Source

## Ссылки {#links}

- <a href="https://schema.org/Product" rel="nofollow noreferrer" target=_blank>Product - Schema.org Type</a>
- <a href="https://schema.org/Offer" rel="nofollow noreferrer" target=_blank>Offer - Schema.org Type</a>
- <a href="https://schema.org/aggregateRating" rel="nofollow noreferrer" target=_blank>aggregateRating - Schema.org Type</a>
- <a href="https://schema.org/additionalProperty" rel="nofollow noreferrer" target=_blank>additionalProperty - Schema.org Type</a>
- <a href="https://schema.org/shippingDetails" rel="nofollow noreferrer" target=_blank>shippingDetails - Schema.org Type</a>
- <a href="https://schema.org/hasMerchantReturnPolicy" rel="nofollow noreferrer" target=_blank>hasMerchantReturnPolicy - Schema.org Type</a>
- <a href="https://schema.org/availability" rel="nofollow noreferrer" target=_blank>availability - Schema.org Type</a>
