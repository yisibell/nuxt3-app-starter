<template>
  <div>
    <VueLogoIcon font-size="36" fill="red" />
    <VueLogoFilledIcon font-size="36" />

    <NuxtSvgIcon name="vue-logo" :font-size="36" fill="gold" />
    <NuxtSvgIcon name="vue-logo-filled" :font-size="36" />
  </div>
</template>

<script setup lang="ts">
import VueLogoIcon from '~/assets/icons/vue-logo.svg?component'
import VueLogoFilledIcon from '~/assets/icons/vue-logo-filled.svg?component'
</script>
