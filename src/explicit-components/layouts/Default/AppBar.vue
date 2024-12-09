<template>
  <v-app-bar
    color="secondary"
    dark
    :extension-height="60"
  >
    <v-app-bar-nav-icon @click="handleNavIconClick" />
    <v-toolbar-title>{{ settings.appName }}</v-toolbar-title>
    <v-spacer />
    <SearchInput />
    <MyCartBtn />
    <MyNoticeBtn />
    <MyAccountBtn />

    <template #extension>
      <CategoryMenu />
    </template>
  </v-app-bar>
</template>

<script setup lang="ts">
import SearchInput from './SearchInput.vue'
import MyNoticeBtn from './MyNoticeBtn.vue'
import MyAccountBtn from './MyAccountBtn.vue'
import MyCartBtn from './MyCartBtn.vue'
import CategoryMenu from './CategoryMenu.vue'
import { settings } from '~/settings'

const emit = defineEmits(['nav-icon-click'])

const handleNavIconClick = () => {
  emit('nav-icon-click')
}
</script>
