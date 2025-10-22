<template>
  <div class="home-view">
    <div class="home-view__header">
      home
    </div>

    <SomeCompB />

    <BaseCountDown :time="1000 * 60" />
  </div>
</template>

<style lang="scss" scoped>
.home-view {
  font-size: 20px;

  &__header {
    height: 200px;
  }
}
</style>
