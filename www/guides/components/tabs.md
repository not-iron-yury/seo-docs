<Breadcrumb title="Табы"/>

# Табы {#tabs}

<ul class="info-block">
  <li class="info-block-itm">Тип компонента: Контентные переключатели</li>
  <li class="info-block-itm">SEO-риск: Средний / Высокий</li>
  <li class="info-block-itm">Критично для: Индексации текстового контента</li>
</ul>

<!------------->

## Суть проблемы {#point}

Реализация посредством подгрузки содержимого вкладок через JavaScript, влечет за собой проблемы с индексацией контента:

- поисковый робот может не увидеть содержимое вкладок
- проиндексируется только первая (или активная по дефолту) вкладка
- часть текстового контента страницы фактически недоступна краулерам и выпадает из индексации

<!------------->

## Правильная модель {#correct-model}

1. JavaScript управляет видимостью интерфейса, но не отвечает за появление контента в DOM.
2. Контент всех вкладок должен существовать в HTML страницы до выполнения JavaScript.

<!------------->

## Примеры {#examples}

::: code-group

```HTML
<div class="tabs">

  <!-- навигация -->
  <div class="tabs-nav">
    <button data-tab="tab1">Вкладка 1</button>
    <button data-tab="tab2">Вкладка 2</button>
    <button data-tab="tab3">Вкладка 3</button>
  </div>

  <!-- содержимое сразу в документе -->
  <div class="tabs-content">

    <div id="tab1" class="tab active">
      Содержимое вкладки 1
    </div>

    <div id="tab2" class="tab">
      Содержимое вкладки 2
    </div>

    <div id="tab3" class="tab">
      Содержимое вкладки 3
    </div>

  </div>

</div>
```

```CSS
.tab {
  display: none;
}

.tab.active {
  display: block;
}
```

```JS
const buttons = document.querySelectorAll("[data-tab]");


buttons.forEach(button => {
  button.addEventListener("click", () => {

    const tabId = button.dataset.tab;

    // JS только меняет CSS-класс
    document.querySelectorAll(".tab").forEach(tab => {
      tab.classList.remove("active");
    });

    document.getElementById(tabId).classList.add("active");

  });
});
```

:::

### Пример для Nuxt / Vue {#nuxt-example}

```VUE
<script setup>
import { ref } from 'vue';

const activeTab = ref('tab1');
</script>

<template>
  <div class="tabs">
    <div class="tabs-nav">
      <button @click="activeTab = 'tab1'">Вкладка 1</button>
      <button @click="activeTab = 'tab2'">Вкладка 2</button>
      <button @click="activeTab = 'tab3'">Вкладка 3</button>
    </div>

    <div class="tabs-content">
      <div v-show="activeTab === 'tab1'">контент 1</div>
      <div v-show="activeTab === 'tab2'">контент 2</div>
      <div v-show="activeTab === 'tab3'">контент 3</div>
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
  <p>Для табов правильно использовать v-show, потому что так весь контент изначально будет в документе и DOM не пересоздаётся.</p>
</div>

<!------------->

## Как не нужно {#how-not-to}

<ul class="list-reset">
  <li>❌ Загружать содержимое вкладки через AJAX после клика</li>
  <li>❌ Генерировать HTML вкладки только после события click</li>
  <li>❌ Подгружать контент вкладок из API динамически</li>
  <li>❌ Делать табы, где в HTML присутствует только первая вкладка</li>
  <li>❌ Использовать табы для загрузки больших блоков контента через lazy-loading</li>
</ul>

<!------------->

## Чек-лист {#checklist}

<ul class="list-reset">
  <li>✔️ Контент всех вкладок присутствует в исходном HTML страницы</li>
  <li>✔️ При отключенном JavaScript контент вкладок всё равно есть в DOM</li>
  <li>✔️ Переключение вкладок не делает сетевых запросов</li>
  <li>✔️ Вкладки не загружают контент через API</li>
</ul>

### Инструменты для проверки {#tools-for-checking}

- DevTools → View Page Source
- DevTools → Network
- отключение JavaScript в браузере
