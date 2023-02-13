<template>
  <div class="default-layout">
    <h1>default layout header</h1>
    <main>
      <slot name="default" />
    </main>
  </div>
</template>

<style lang="scss" scoped>
.default-layout {
  max-width: 50%;
  margin: 0 auto;
}
</style>
