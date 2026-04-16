# Переключатель вида списка (List / Grid) {#view-switcher}

<ul class="info-block">
  <li class="info-block-itm">Тип компонента: Контентные переключатели</li>
  <li class="info-block-itm">SEO-риск: Низкий</li>
  <li class="info-block-itm">Критично для: UX, а не для индексации</li>
</ul>

<!------------->

## Суть проблемы {#point}

Некорректная реализация переключателя вида списков может приводить к:

- загрузке нового контента
- созданию новых URL
- выполнению API-запросов

До подобных реализаций ещё нужно додуматься, но иногда такое бывает.

<!------------->

## Правильная модель {#correct-model}

1. Переключатель должен управлять CSS или классами, а не загрузкой данных.
2. List / Grid - это режим отображения интерфейса, а не отдельное состояние страницы.
3. Контент страницы должен оставаться тем же самым.

<!------------->

## Примеры {#examples}

::: code-group

```HTML
<div class="view-switcher">
  <!-- data-атрибут для передачи типа представления -->
  <button data-view="grid">Сетка</button>
  <button data-view="list">Список</button>
</div>

<!-- список товаров (изначально grid) -->
<div class="products grid" id="products">
  <article class="product">Товар 1</article>
  <article class="product">Товар 2</article>
  <article class="product">Товар 3</article>
</div>
```

```CSS
.products.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
}

.products.list {
  display: block;
}

.products.list .product {
  margin-bottom: 20px;
}
```

```JS
const switchButtons = document.querySelectorAll('[data-view]');
const container = document.getElementById('products');

switchButtons.forEach(button => {

  button.addEventListener('click', () => {

    const view = button.dataset.view; // определяем grid или list

    container.classList.remove('grid', 'list');
    container.classList.add(view);

  });

});
```

:::

### Пример для Nuxt / Vue {#nuxt-example}

```Vue
<script setup>
import { ref } from 'vue'

const view = ref('grid')
</script>

<template>

<div class="view-switcher">

  <button @click="view='grid'">Сетка</button>
  <button @click="view='list'">Список</button>

</div>

<div :class="['products', view]">

  <article v-for="product in products" :key="product.id">
    {{ product.title }}
  </article>

</div>

</template>
```

Контент списка конечно же должен рендериться сервером (SSR).

<!------------->

## Как не нужно {#how-not-to}

<ul class="list-reset">
  <li>❌ Загружать список заново при переключении вида</li>
  <li>❌ Делать API-запросы для list/grid режима</li>
  <li>❌ Создавать отдельные страницы вида (?view=list)</li>
  <li>❌ Генерировать новый DOM при переключении</li>
  <li>❌ Изменять URL при смене вида</li>
</ul>

<!------------->

<!------------->

## Чек-лист {#checklist}

<ul class="list-reset">
  <li>✔️ При переключении режима не происходит сетевых запросов</li>
  <li>✔️ Контент элементов не меняется</li>
  <li>✔️ URL страницы не изменяется</li>
  <li>✔️ HTML элементов списка остаётся тем же</li>
  <li>✔️ Меняются только CSS-классы</li>
</ul>

<!------------->

## Инструменты проверки {#checking-tools}

- DevTools → Network
- DevTools → Elements
