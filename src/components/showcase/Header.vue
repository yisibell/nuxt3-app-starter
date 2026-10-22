<template>
  <header class="page-header">
    <NuxtLink
      to="/"
      class="brand"
    ><span class="brand-mark">N</span><span>Nuxt Starter</span></NuxtLink>
    <div class="page-header-content">
      <p class="eyebrow">
        The foundation
      </p><h1>{{ title }}</h1><p>{{ description }}</p>
    </div>
  </header>
</template>

<script lang="ts" setup>
defineProps<{ title: string, description: string }>()
</script>

<style lang="scss" scoped>
@use '~/views/showcase/styles' as *;
.page-header {
  padding: 26px 0 0;
}
.brand {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  color: $ink;
  font-size: 15px;
  font-weight: 800;
}
.brand-mark {
  display: grid;
  place-content: center;
  width: 29px;
  height: 29px;
  border-radius: 9px;
  color: white;
  background: $accent;
}
.page-header-content {
  padding: 120px 0 0;
}
.page-header h1 {
  margin: 18px 0;
  font-size: clamp(55px, 8vw, 92px);
  line-height: 0.95;
  letter-spacing: -0.07em;
}
.page-header-content > p:last-child {
  max-width: 440px;
  color: $muted;
  font-size: 17px;
  line-height: 1.7;
}
.eyebrow {
  margin: 0;
  color: $accent;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.16em;
  text-transform: uppercase;
}
</style>
