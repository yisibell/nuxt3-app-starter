<template>
  <v-tabs
    v-model="currTopCategoryIndex"
    :grow="true"
    class="top-category"
    selected-class="top-category--active"
    bg-color="white"
    color="secondary"
    align-tabs="title"
    light
    hide-slider
  >
    <v-menu
      v-for="(v, i) in categoryItems"
      :key="i"
      tile
      open-on-hover
      :disabled="!v.list"
      :close-on-content-click="false"
      location="bottom center"
    >
      <template #activator="{ props }">
        <v-tab
          v-bind="props"
          @click="handleTopCategoryChange(i)"
        >
          <div
            :class="i === currTopCategoryIndex ? 'text-secondary' : 'text-grey'"
          >
            {{ v.name }}
          </div>
        </v-tab>
      </template>

      <v-divider />

      <v-card
        v-if="v.list && v.list.length > 0"
        min-width="100vw"
        class="pa-4"
        rounded="0"
        elevation="0"
        style="margin-left: -10px"
      >
        <v-chip-group
          v-model="currSecondaryCategory"
          selected-class="text-secondary"
          column
          @update:model-value="handleSecondaryCategoryChange(v.id)"
        >
          <v-chip
            v-for="e in v.list"
            :key="e.id"
            :value="e.id"
          >
            <div
              style="min-width: 90px"
              class="text-center"
            >
              {{ e.name }}
            </div>
          </v-chip>
        </v-chip-group>
      </v-card>
    </v-menu>
  </v-tabs>
</template>

<script setup lang="ts">
import useProducts from '~/composables/logic/useProducts'
import useCategory from '~/composables/logic/useCategory'
import { useSiteStore } from '~/store/site'

const route = useRoute()
const routeName = computed(() => route.name)

const SiteStore = useSiteStore()

const {
  categoryItems,
  fetchCategories,
  currTopCategoryIndex,
  currSecondaryCategory,
} = useCategory()

const { updateProductsData } = useProducts()

onMounted(() => {
  if (routeName.value === 'index') {
    SiteStore.RESET_GOODS_LIST_SEARCH_PARAMS()
  }

  fetchCategories()

  updateProductsData(true, false)
})

// 切换主分类
const handleTopCategoryChange = (index: number) => {
  SiteStore.SET_GOODS_LIST_SEARCH_PARAMS_KEYWORD('')

  SiteStore.SET_GOODS_LIST_SEARCH_PARAMS_TOPCATEGORY(categoryItems.value[index].id)

  SiteStore.SET_GOODS_LIST_SEARCH_PARAMS_SECONDARY_CATEGORY(0)

  updateProductsData(true)
}

// 切换次分类
const handleSecondaryCategoryChange = (pid: number) => {
  SiteStore.SET_GOODS_LIST_SEARCH_PARAMS_KEYWORD('')

  SiteStore.SET_TOP_CATEGORY_INDEX(categoryItems.value.findIndex(v => v.id === pid))

  SiteStore.SET_GOODS_LIST_SEARCH_PARAMS_TOPCATEGORY(pid)

  updateProductsData(true)
}
</script>

<style lang="scss" scoped>
.top-category {
  .v-tab {
    font-size: 0.95rem;
  }

  &--active {
    background-color: rgba(26, 188, 156, 0.17);
  }
}
</style>
