<template>
  <div class="activity-some-popup">
    some activity popup

    <SomeCompA />
  </div>
</template>

<script lang="ts" setup>
defineOptions({
  name: 'ActivitySomePopup',
})
</script>

<style lang="scss" scoped>
.activity-some-popup {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100vw;
  height: 56px;
  padding: 0 10px;
  box-sizing: border-box;
  background-color: aquamarine;
  display: flex;
  align-items: center;
}
</style>
