<template>
  <div class="product-list">
    <ul>
      <li
        v-for="(v) in 10"
        :key="v"
        class="product-list__item"
      >
        item {{ v }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
defineOptions({
  name: 'ProductList',
})
</script>
