# Аккордеоны / Спойлеры {#accordions}

<ul class="info-block">
  <li class="info-block-itm">Тип компонента: Контентные переключатели</li>
  <li class="info-block-itm">SEO-риск: Средний</li>
  <li class="info-block-itm">Критично для: Индексации текстового контента</li>
</ul>

## Суть проблемы {#point}

Аккордеоны и спойлеры зачастую используются для размещения большого объёма текста. Распространённая ошибка - загружать содержимое аккордеона только после клика пользователя. Это ведет к тому, что в результате:

- поисковые системы могут не увидеть текст
- индексируется только заголовок
- часть контента страницы фактически недоступна краулерам и не индексируется
- не индексируемый контент становится бесполезным для SEO

## Правильная модель {#correct-model}

1. Аккордеон - это исключительно <strong>визуальный</strong> способ организации контента.
2. Контент страницы должен существовать независимо от состояния интерфейса.
3. JavaScript должен лишь управлять раскрытием и скрытием блока, а быть механизмом его загрузки.

## Примеры {#examples}

::: code-group

```HTML
<div class="accordion">

  <div class="accordion-item">

    <button class="accordion-header">
      Что входит в услугу?
    </button>

    <div class="accordion-content">
      <p>
        В услугу входит аудит сайта, подготовка технических рекомендаций
        и внедрение SEO-оптимизации.
      </p>
    </div>

  </div>

  <div class="accordion-item">

    <button class="accordion-header">
      Сколько времени занимает оптимизация?
    </button>

    <div class="accordion-content">
      <p>
        В среднем базовая оптимизация занимает от 2 до 4 недель.
      </p>
    </div>

  </div>

</div>
```

```CSS
.accordion-content {
  display: none;
}

.accordion-item.active .accordion-content {
  display: block;
}
```

```JS
const headers = document.querySelectorAll('.accordion-header');

headers.forEach(header => {

  header.addEventListener('click', () => {

    const item = header.parentElement;

    item.classList.toggle('active'); // JS только меняет CSS-класс

  });

});
```

:::

### Пример для Nuxt / Vue {#nuxt-example}

```VUE
<script setup>
import { ref } from 'vue';

const open = ref(null);

const toggle = (index) => {
  open.value = open.value === (index ? null : index);
};
</script>

<template>
  <div class="accordion">
    <div class="item">
      <button @click="toggle(1)">
        Что входит в услугу?
      </button>

      <div v-show="open === 1">
        В услугу входит аудит сайта и внедрение SEO-рекомендаций.
      </div>
    </div>

    <div class="item">
      <button @click="toggle(2)">
        Сколько времени занимает оптимизация?
      </button>

      <div v-show="open === 2">
        Базовая оптимизация занимает 2–4 недели.
      </div>
    </div>
  </div>
</template>
```

<strong>v-show или v-if</strong>

| директива | поведение                     |
| --------- | ----------------------------- |
| `v-show`  | скрывает через `display:none` |
| `v-if`    | удаляет из DOM                |

<div class="text-block text-block--tip mt-30">
  <p>Содержимое аккордеонов должно присутствовать в HTML - рендериться сервером (SSR/SSG).</p>
</div>

## Как не нужно {#how-not-to}

<ul class="list-reset">
  <li>❌ Загружать содержимое аккордеона через API после клика</li>
  <li>❌ Генерировать HTML блока динамически</li>
  <li>❌ Использовать lazy-loading для текстового контента</li>
  <li>❌ Оставлять в HTML только заголовки вопросов</li>
  <li>❌ Подгружать содержимое через JavaScript-виджет</li>
</ul>

## Чек-лист {#checklist}

<ul class="list-reset">
  <li>✔️ Контент аккордеонов существует в DOM до клика</li>
  <li>✔️ Раскрытие блока не делает сетевых запросов</li>
  <li>✔️ При отключенном JavaScript текст остаётся в HTML</li>
</ul>

## Инструменты проверки {#checking-tools}

- DevTools → View Page Source
- DevTools → Network
- отключение JavaScript в браузере
