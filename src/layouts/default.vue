<template>
  <div><slot name="default" /></div>
</template>

<script lang="ts">
import { defineComponent, useHead } from '#imports'
import useApp from '~~/packages/composables/helper/useApp'

export default defineComponent({
  name: 'DefaultLayoutContainer',
  setup() {
    const { settings } = useApp()

    useHead({ titleTemplate: `${settings.value.appName}%s` })
  },
})
</script>
