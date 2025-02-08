<template>
  <div class="login-container bg-appbody">
    <div>
      <div class="text-center mb-6 text-h4">
        <span>{{ $t('welcome') }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'custom',
  title: '登录',
})

const route = useRoute()

useHead({
  title: route.meta.title as string,
})
</script>

<style lang="scss" scoped>
.login-container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
