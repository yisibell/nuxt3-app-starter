<template>
  <v-app>
    <AppBar @nav-icon-click="drawerVisible = true" />

    <NavigationDrawer v-model="drawerVisible" />

    <v-main class="bg-appbody">
      <v-container>
        <Breadcrumbs />
        <slot name="default" />
      </v-container>

      <BackToTop />
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import AppBar from './AppBar.vue'
import NavigationDrawer from './NavigationDrawer.vue'
import Breadcrumbs from './Breadcrumbs.vue'
import BackToTop from './BackToTop.vue'

defineOptions({
  name: 'DefaultLayout',
})

const drawerVisible = ref(false)
</script>
