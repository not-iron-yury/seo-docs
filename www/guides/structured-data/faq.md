# FAQ + Structured Data {#faq}

<ul class="info-block">
  <li class="info-block-itm">Тип компонента: Контентный блок + SEO-разметка</li>
  <li class="info-block-itm">SEO-риск: Высокий </li>
  <li class="info-block-itm">Критично для: Расширенных сниппетов, индексации, CTR</li>
</ul>

Блок FAQ является отдельным SEO-паттерном. Он должен существовать одновременно и как контент на странице, и как структурированные данные.

## Суть проблемы {#point}

FAQ-блоки часто реализуются как обычные аккордеоны без структурированных данных или с некорректной разметкой. В результате:

- поисковая система не распознаёт блок как FAQ
- нет влияния на сниппет и теряется потенциальный рост CTR
- контент не используется полноценно в ранжировании

## Правильная модель {#correct-model}

1. Как и аккордеоны, FAQ это визуальный способ организации контента.
2. Контент FAQ должен существовать независимо от состояния интерфейса.
3. Однако, FAQ это не только UI-компонент, но и SEO-сущность.
4. Поэтому FAQ должен быть размечен через structured data.

## FAQ vs Accordions

<ul class="list-reset">
  <li><strong>FAQ:</strong>
    <ul class="ml-30">
      <li>SEO-паттерн, тип контента (content layer)</li>
      <li>инструмент покрытия long-tail запросов</li>
      <li>ориентирован на реальные поисковые запросы и пользовательские интенты</li>
      <li>обязательный формат: "вопрос → ответ"</li>
    </ul>
  </li>
  <li><strong>Аккордеон:</strong>
    <ul class="ml-30">
      <li>UI-паттерн, способ показать контент </li>
      <li>не даёт SEO-ценности сам по себе</li>
      <li>может содержать что угодно (текст, списки, характеристики)</li>
      <li>не обязан быть в формате вопрос–ответ</li>
    </ul>

  </li>
</ul>

## Когда использовать FAQ {#when-to-use}

- страница предполагает формат вопросов-ответов
- есть реальные вопросы пользователей
- контент НЕ дублирует основной текст страницы
- блок создаётся для пользователя, а не "для SEO"

## Примеры {#examples}

Базовая реализация FAQ (без структурированных данных)

::: code-group

```HTML
<section class="faq">

  <div class="faq-item">
    <h3>Что входит в SEO-оптимизацию?</h3>
    <p>Аудит сайта, исправление технических ошибок и работа с контентом.</p>
  </div>

  <div class="faq-item">
    <h3>Сколько времени занимает продвижение?</h3>
    <p>Первые результаты обычно появляются через 2–3 месяца.</p>
  </div>

</section>
```

```CSS

.faq-item p {
  display: none;
  margin-top: 8px;
}

.faq-item.active p {
  display: block;
}

.faq-item h3 {
  cursor: pointer;
}
```

```JS

document.querySelectorAll('.faq-item h3').forEach(title => {
  title.addEventListener('click', () => {
    const item = title.parentElement;
    item.classList.toggle('active');
  });
});

```

:::

<div class="text-block text-block--info mt-30">
  <p><strong>Технические моменты:</strong></p>

- контент уже есть в HTML
- JS только переключает класс
- никаких API-запросов
- работает без изменения структуры DOM
</div>

<div class="text-block text-block--tip mt-30">
 <p><strong>Используй кастомную JS-реализацию когда:</strong></p>
 
  - сложный UI
  - нужно управлять состоянием
  - есть интеграция с другими компонентами
  - SPA-архитектура
</div>

### Через Details {#details}

::: code-group

```HTML
<section class="faq">

  <details class="faq-item">
    <summary>Что входит в SEO-оптимизацию?</summary>
    <p>Аудит сайта, исправление технических ошибок и работа с контентом.</p>
  </details>

  <details class="faq-item">
    <summary>Сколько времени занимает продвижение?</summary>
    <p>Первые результаты обычно появляются через 2–3 месяца.</p>
  </details>

</section>
```

```CSS
.faq-item {
  margin-bottom: 12px;
}

.faq-item summary {
  cursor: pointer;
  font-weight: 600;
}

.faq-item p {
  margin-top: 8px;
}
```

:::

<div class="text-block text-block--info mt-30">
  <p><strong>Технические моменты:</strong></p>

- <code>summary</code> - кликабельный заголовок
- <code>details</code> - управляет состоянием (open/close)
- весь контент сразу в DOM
- работает без JavaScript
</div>

<div class="text-block text-block--tip mt-30">
 <p><strong>Используй details когда:</strong></p>
 
  - простой FAQ
  - статичный контент (ванильная реализация)
  - не нужна сложная логика
  - в приоритете надёжность и скорость разработки
</div>

## JSON-LD

```HTML [JSON-LD]
<head>
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Что входит в SEO-оптимизацию?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Аудит сайта, исправление технических ошибок и работа с контентом."
        }
      },
      {
        "@type": "Question",
        "name": "Сколько времени занимает продвижение?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Первые результаты обычно появляются через 2–3 месяца."
        }
      }
    ]
  }
  </script>
</head>
```

## Nuxt / SSR

```VUE [Nuxt / SSR]
<script setup>
const faq = [
  {
    q: 'Что входит в SEO-оптимизацию?',
    a: 'Аудит сайта, исправление ошибок и работа с контентом.'
  },
  {
    q: 'Сколько времени занимает продвижение?',
    a: 'Первые результаты через 2–3 месяца.'
  }
]

useHead({
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faq.map(item => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.a
          }
        }))
      })
    }
  ]
})
</script>
```

<div class="text-block text-block--tip mt-30">
  <p><strong>Важно:</strong></p>

- JSON-LD должен рендериться на сервере (SSR)
- данные FAQ должны совпадать с HTML
</div>

## Microdata

```HTML [Microdata]
<section class="faq" itemscope itemtype="https://schema.org/FAQPage">

  <div class="faq-item" itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">

    <h3 itemprop="name">
      Что входит в SEO-оптимизацию?
    </h3>

    <div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
      <p itemprop="text">
        Аудит сайта, исправление технических ошибок и работа с контентом.
      </p>
    </div>

  </div>

  <div class="faq-item" itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">

    <h3 itemprop="name">
      Сколько времени занимает продвижение?
    </h3>

    <div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
      <p itemprop="text">
        Первые результаты обычно появляются через 2–3 месяца.
      </p>
    </div>

  </div>

</section>
```

<div class="text-block text-block--info mt-30">
 <p><strong>Технические моменты:</strong></p>
 
  - <code>itemscope</code> + <code>itemtype</code> задают тип сущности
  - <code>mainEntity</code> - список вопросов FAQPage
  - <code>name</code> - текст вопроса
  - <code>acceptedAnswer</code> → text - ответ
</div>

<div class="text-block text-block--tip mt-30">
 <p><strong>Используй Microdata если:</strong></p>
 
  - чистый HTML / ванильный JS проект
  - нет server-side рендеринга
  - нельзя внедрить JSON-LD в head документа
  - очень простая структура страницы
</div>

## Проблема дублирования {#duplication-problem}

Если один и тот же FAQ вставлен на большом количестве страниц и занимает заметную часть контента, то страницы становятся похожими друг на друга. Вытекающие проблемы:

- размытие релевантности
- снижение уникальности страниц
- поисковик может хуже понимать, о чём страница
- поисковик может игнорировать разметку
- снижается шанс получения rich results (расширенный сниппет)

## Допустимое дублирование {#perm-duplication}

<p><strong>I. Разделить типы FAQ</strong></p>

<ol>
  <li>Повторяется FAQ (глобальные вопросы)
    <ul>
      <li>доставка</li>
      <li>оплата</li>
      <li>гарантия</li>
    </ul>
  </li>
  <li>Уникальный FAQ (участвует в SEO)
    <ul>
      <li>вопросы по категории</li>
      <li>вопросы по товару</li>
    </ul>
  </li>
</ol>

<p class="mt-40"><strong>II. Стратегия</strong></p>

<ol>
  <li>Глобальные вопросы с разметкой разместить на отдельной странице.</li>
  <li>На странице товара / раздела:
    <ul>
      <li>2–3 глобальных вопроса (без разметки)</li>
      <li>2–4 уникальных вопроса (с разметкой)</li>
    </ul>
  </li>
</ol>

<div class="text-block text-block--tip mt-30">
  <p>FAQ должен усиливать конкретную страницу, а не дублировать общий контент сайта.</p>
</div>

## Как не нужно {#how-not-to}

<ul class="list-reset">
  <li>❌ Добавлять FAQ только в JSON-LD без отображения на странице</li>
  <li>❌ Генерировать FAQ через JS после загрузки</li>
  <li>❌ Размещать в HTML и JSON-LD разный текст</li>
  <li>❌ Дублировать FAQ на всех страницах сайта</li>
  <li>❌ Делать автоматически сгенерированные (низкокачественные) вопросы</li>
  <li>❌ Использовать FAQ там, где нет реальных вопросов пользователя</li>
</ul>

## Чек-лист {#checklist}

<ul class="list-reset">
  <li>✔️ FAQ присутствует в HTML страницы</li>
  <li>✔️ Разметка присутствует в исходном коде</li>
  <li>✔️ Данные в разметке совпадают с текстом на странице</li>
  <li>✔️ Нет загрузки FAQ через API</li>
  <li>✔️ Страница проходит валидацию structured data</li>
</ul>

## Инструменты проверки {#checking-tools}

- <a href="https://search.google.com/test/rich-results" rel="nofollow noreferrer" target=_blank>Google Rich Results Test</a>
- DevTools → Elements / View Source
