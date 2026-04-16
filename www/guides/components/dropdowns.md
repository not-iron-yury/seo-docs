# Dropdowns (Mega Menu) {#dropdowns}

<ul class="info-block">
  <li class="info-block-itm">Тип компонента: Навигационные элементы</li>
  <li class="info-block-itm">SEO-риск: Средний </li>
  <li class="info-block-itm">Критично для: Crawlability и внутренней перелинковки</li>
</ul>

## Суть проблемы {#point}

Частая ошибка - реализовывать раскрытие меню так, что ссылки внутри него появляются только по событию через JavaScript. Это приводит к тому, что:

- поисковый робот может не увидеть часть ссылок
- нарушается внутренняя перелинковка
- часть страниц получает меньше внутреннего веса

## Правильная модель {#correct-model}

- Dropdowns (Mega Menu) - это обычная навигация сайта, которая просто визуально скрыта.
- Все ссылки навигации должны присутствовать в DOM независимо от состояния интерфейса.
- JavaScript должен управлять <strong>только отображением меню</strong>, но не создавать ссылки динамически.

## Примеры {#examples}

::: code-group

```HTML

<!-- все ссылки присутствуют в HTML страницы -->
<nav class="main-menu">
  <ul>

    <li class="menu-item">

      <a href="/catalog/">Каталог</a>

      <div class="dropdown">
        <a href="/catalog/laptops/">Ноутбуки</a>
        <a href="/catalog/smartphones/">Смартфоны</a>
        <a href="/catalog/tablets/">Планшеты</a>
      </div>

    </li>
  </ul>
</nav>
```

```CSS
/* меню раскрывается через CSS */
.dropdown {
  display: none;
}

.menu-item:hover .dropdown {
  display: block;
}

```

:::

## Вариативность {#variability}

<ol class="list-reset">
  <li>Если под триггером есть своя собственная страница, необходимо оставлять возможность перехода на неё - правильно использовать <code>a href=""</code>

```HTML
<a href="/catalog/">Каталог</a>
```

  </li>
  <li>Если триггер раскрытия меню не имеет под собой страницу - используется <code>button</code>. Естественно сокрытие через CSS, а смена класса по JS-событию.

```HTML
<button aria-expanded="false">Каталог</button>

```

  </li>

  <li>Еще один валидный и SEO-безопасный способ это <code>details</code> + <code>summary</code>.

```HTML
<details>
  <summary>Каталог</summary>

  <a href="/catalog/laptops/">Ноутбуки</a>
  <a href="/catalog/phones/">Смартфоны</a>

</details>
```

  </li>
</ol>

## Как не нужно {#how-not-to}

<ul class="list-reset">
  <li>❌ Загружать пункты меню через API</li>
  <li>❌ Генерировать ссылки меню только после <code>hover</code></li>
  <li>❌ Создавать навигацию через <code>onclick</code> вместо <code>a href</code></li>
  <li>❌ Подгружать структуру меню через JavaScript</li>
</ul>

## Чек-лист {#checklist}

<ul class="list-reset">
  <li>✔️ Все ссылки меню присутствуют в HTML исходнике</li>
  <li>✔️ Меню не делает сетевых запросов при раскрытии</li>
  <li>✔️ Навигация реализована через <code>a href</code></li>
  <li>✔️ Ссылки доступны без JavaScript</li>
</ul>

## Инструменты проверки {#checking-tools}

- DevTools → View Page Source
- DevTools → Network
- отключение JavaScript в браузере
