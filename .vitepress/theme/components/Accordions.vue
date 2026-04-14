<script setup>
import { ref } from 'vue';

const open = ref(null);

const toggle = (index) => {
  open.value = open.value === index ? null : index;
};
</script>

<template>
  <div class="accordion">
    <div class="item">
      <button @click="toggle(1)">Что входит в услугу?</button>

      <div v-show="open === 1">В услугу входит аудит сайта и внедрение SEO-рекомендаций.</div>
    </div>

    <div class="item">
      <button @click="toggle(2)">Сколько времени занимает оптимизация?</button>

      <div v-show="open === 2">Базовая оптимизация занимает 2–4 недели.</div>
    </div>
  </div>
</template>
