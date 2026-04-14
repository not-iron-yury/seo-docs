<template>
  <ul class="checklist">
    <li v-for="(item, index) in items" :key="index">
      <input type="checkbox" disabled /> {{ item }}
    </li>
  </ul>
</template>

<script setup>
defineProps({
  items: {
    type: Array,
    required: true,
  },
});
</script>

<style scoped>
.checklist {
  list-style: none;
  padding-left: 0;
}
.checklist li {
  margin: 4px 0;
  display: flex;
  align-items: center;
}
.checklist input[type='checkbox'] {
  margin-right: 6px;
}
</style>
