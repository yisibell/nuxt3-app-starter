<template>
  <v-app>
    <v-main>
      <slot name="default" />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { defineComponent, useHead } from '#imports'
import useApp from '~~/packages/composables/helper/useApp'

export default defineComponent({
  name: 'SimpleLayoutContainer',
  setup() {
    const { settings } = useApp()

    useHead({ titleTemplate: `${settings.value.appName}%s` })
  },
})
</script>
