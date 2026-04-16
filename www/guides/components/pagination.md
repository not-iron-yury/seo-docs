# Пагинация и «Показать ещё» {#pagination}

<ul class="info-block">
  <li class="info-block-itm">Тип компонента: Навигационные элементы</li>
  <li class="info-block-itm">SEO-риск: Средний / Высокий</li>
  <li class="info-block-itm">Критично для: Индексации текстового контента</li>
</ul>

## Суть проблемы {#point}

Реализация загрузки элементов только через кнопку «Показать ещё» или infinite scroll, без создания отдельных URL страниц, приводит к следующему:

- поисковые роботы видят только первую страницу
- остальные элементы листинга не индексируются
- нарушается распределение внутреннего веса

## Правильная модель {#correct-model}

1. Пагинация - это навигация между страницами, а не динамическая подгрузка данных.
2. Все страницы пагинации должны существовать как отдельные URL и быть доступны через обычные ссылки.
3. Кнопка «Показать ещё» может существовать, но она может использоваться только как UX-улучшение поверх обычной пагинации с отдельными URL страниц..
4. JavaScript может улучшать UX, но структура страниц должна существовать независимо от него.

## Примеры {#examples}

### Пагинация {#example-pagination}

```HTML
<div class="posts">
  <!-- список постов -->
</div>

<nav class="pagination">
  <a href="/blog/">1</a>
  <a href="/blog/page/2/">2</a>
  <a href="/blog/page/3/">3</a>
</nav>
```

<div class="text-block text-block--tip mt-30">
  <p>Каждая страница содержит свой список ссылок на другие страницы.</p>
</div>

### Кнопка «Показать ещё» {#show-more-button}

SEO-архитектура:

```
HTML страницы
   ├─ пагинация (основа SEO)
   │      │
   │      └─ прямые ссылки на существующие страницы
   │
   └─ кнопка "Показать ещё" (JS-улучшение UX)
          │
          └─ динамическая подгрузка контента следующих страниц
```

### Пример для JS {#js-example}

::: code-group

```HTML
<div class="posts">
  <!-- список постов -->
</div>

<!-- Отсутствуют кнопки навигации, но не сами страницы -->
<!-- <nav class="pagination">
  <a href="/blog/">1</a>
  <a href="/blog/page/2/">2</a>
  <a href="/blog/page/3/">3</a>
</nav> -->

<!-- UX-слой над пагинацией -->
<button id="loadMore">Показать ещё</button>
```

```JS
const button = document.querySelector('#loadMore');

let nextPage = 2;

button.addEventListener('click', async () => {
  button.disabled = true;

  const res = await fetch(`/api/posts?page=${nextPage}`);
  const data = await res.json();

  renderPosts(data);
  nextPage++;
  button.disabled = false;

});
```

:::
При этом:

- страницы `/page/2/`, `/page/3/` существуют
- JS только улучшает UX

<div class="text-block text-block--tip mt-30">
  <ol>
    <li>Кнопка "Показать ещё" загружает данные из API, но страницы пагинации должны существовать как обычные HTML-страницы.</li>
    <li>Смысл SEO-правильной реализации «Показать ещё» не в создании нового контента на лету, а в дополнительном UX-слое поверх уже существующих страниц пагинации.</li>
  </ol>
</div>

### Пример для Nuxt / Vue {#nuxt}

```VUE
<script setup>
import { ref } from 'vue';

const page = ref(2);
const posts = ref([]);

// первая страница - через SSR
const { data } = await useAsyncData(
  'posts',
  () => $fetch(`/api/posts?page=1`)
  );

posts.value = data.value || [];

// остальные страницы - по кнопке
const loadMore = async () => {
  const data = await $fetch(`/api/posts?page=${page.value}`);
  posts.value.push(...data);
  page.value++;
};
</script>

<template>
  <div class="posts">
    <article v-for="post in posts" :key="post.id">
      {{ post.title }}
    </article>
  </div>

  <button @click="loadMore">Показать ещё</button>
</template>

```

<div class="text-block text-block--tip">
  <ol>
    <li>Первая страница рендерится через SSR и это гарантирует, что:
    <ul>
      <li>контент первой страницы есть в HTML</li>
      <li>поисковые системы его увидят</li>
      <li>страница индексируется корректно</li>
    </ul>
    </li>
    <li>Дальнейшая подгрузка контента - только UX улучшение</li>
    <li>Для корректной архитектуры, должны существовать отдельные страницы пагинации <code>/blog/</code>, <code>/blog/page/2/</code>,<code>/blog/page/3/</code>. Которые обязательно: 
      <ul>
        <li>имеют SSR</li>
        <li>возвращают HTML</li>
        <li>доступны через <code>a href</code></li>
      </ul>
    </li>
  </ol>
</div>

## Как не нужно {#how-not-to}

<ul class="list-reset">
  <li>❌ Реализовывать листинг только через кнопку «Показать ещё»</li>
  <li>❌ Использовать infinite scroll без пагинации</li>
  <li>❌ Загружать элементы только через API без HTML страниц</li>
  <li>❌ Делать пагинацию через JS (onclick)</li>
  <li>❌ Использовать кнопки вместо ссылок для перехода между страницами</li>
</ul>

## Чек-лист {#checklist}

<ul class="list-reset">
  <li>✔️ Каждая страница листинга имеет отдельный URL</li>
  <li>✔️ Ссылки пагинации реализованы через <code>a href=""</code></li>
  <li>✔️ Переключение вкладок не делает сетевых запросов</li>
  <li>✔️ Вкладки не загружают контент через API</li>
</ul>

### Инструменты для проверки {#tools-for-checking}

- DevTools → View Page Source
- DevTools → Network
- отключение JavaScript в браузере
