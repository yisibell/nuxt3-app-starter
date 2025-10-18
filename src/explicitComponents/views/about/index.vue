<template>
  <div class="about-view">
    <div class="about-view__header">
      about
    </div>

    <BaseCountDown :time="1000 * 60" />
  </div>
</template>

<style lang="scss" scoped>
.about-view {
  font-weight: 900;

  &__header {
    height: 100px;
  }
}
</style>
