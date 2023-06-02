<template>
  <v-app>
    <AppBar @nav-icon-click="drawerVisible = true" />

    <NavigationDrawer v-model="drawerVisible" />

    <v-main class="appbody">
      <v-container>
        <Breadcrumbs />
        <slot name="default" />
      </v-container>

      <BackToTop />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { defineComponent, ref } from '#imports'
import AppBar from './AppBar.vue'
import NavigationDrawer from './NavigationDrawer.vue'
import Breadcrumbs from './Breadcrumbs.vue'
import BackToTop from './BackToTop.vue'

export default defineComponent({
  name: 'DefaultLayout',
  components: {
    AppBar,
    NavigationDrawer,
    Breadcrumbs,
    BackToTop,
  },
  setup() {
    const drawerVisible = ref(false)

    return {
      drawerVisible,
    }
  },
})
</script>
