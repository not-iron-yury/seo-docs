<script setup>
import { useRoute } from 'vitepress';
import { categories, sections } from '../constants.js';

const route = useRoute();
const [_, section, category, __] = route.path.split('/');

defineProps({
  title: {
    type: String,
  },
});
</script>

<template>
  <nav class="breadcrumbs" aria-label="Breadcrumb">
    <ol itemscope itemtype="https://schema.org/BreadcrumbList">
      <li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
        <a itemprop="item" :href="`/${section}/`">
          <span itemprop="name">{{ sections[section] }}</span>
        </a>
        <meta itemprop="position" content="1" />
      </li>

      <li
        v-if="categories[category]"
        itemprop="itemListElement"
        itemscope
        itemtype="https://schema.org/ListItem"
      >
        <a itemprop="item" :href="`/${section}/${category}`">
          <span itemprop="name">{{ categories[category] }}</span>
        </a>
        <meta itemprop="position" content="2" />
      </li>

      <li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
        <span itemprop="name" aria-current="page">{{ title || route.data.title }}</span>
        <meta itemprop="position" content="3" />
      </li>
    </ol>
  </nav>
</template>

<style scoped>
.breadcrumbs {
  font-size: 14px;
  margin-bottom: 40px;
}

.breadcrumbs ol {
  display: flex;
  align-items: center;
  gap: 6px;
  flex-wrap: wrap;

  padding: 0;
  margin: 0;

  list-style: none;
}

.breadcrumbs li {
  margin: 0;
}

.breadcrumbs li::after {
  content: '/';
  margin-left: 6px;
  color: #999;
}

.breadcrumbs li:last-child::after {
  content: '';
}

.breadcrumbs a {
  text-decoration: none;
  color: var(--vp-c-brand-1);
}

.breadcrumbs a:hover {
  text-decoration: underline;
}
</style>
