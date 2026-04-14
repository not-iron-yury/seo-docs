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
