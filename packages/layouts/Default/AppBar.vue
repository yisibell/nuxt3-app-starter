<template>
  <v-app-bar app color="secondary" dark :extension-height="60">
    <v-app-bar-nav-icon @click="handleNavIconClick"></v-app-bar-nav-icon>
    <v-toolbar-title>{{ settings.appName }}</v-toolbar-title>
    <v-spacer></v-spacer>

    <SearchInput />

    <MyCartBtn />

    <MyNoticeBtn />

    <MyAccountBtn />

    <template #extension>
      <CategoryMenu />
    </template>
  </v-app-bar>
</template>

<script lang="ts">
import { defineComponent } from '#imports'
import SearchInput from './SearchInput.vue'
import MyNoticeBtn from './MyNoticeBtn.vue'
import MyAccountBtn from './MyAccountBtn.vue'
import MyCartBtn from './MyCartBtn.vue'
import CategoryMenu from './CategoryMenu.vue'
import useApp from '~~/packages/composables/helper/useApp'

export default defineComponent({
  components: {
    SearchInput,
    MyNoticeBtn,
    MyAccountBtn,
    MyCartBtn,
    CategoryMenu,
  },
  emits: ['nav-icon-click'],
  setup(_props, { emit }) {
    const { settings } = useApp()
    const handleNavIconClick = () => {
      emit('nav-icon-click')
    }

    return {
      handleNavIconClick,
      settings,
    }
  },
})
</script>
