<template>
  <v-tabs
    v-model="currTopCategoryIndex"
    :grow="true"
    class="top-category"
    active-class="top-category--active"
    color="secondary"
    background-color="white"
    align-with-title
    light
    hide-slider
  >
    <v-tab
      v-for="(v, i) in categoryItems"
      :key="i"
      @click="handleTopCategoryChange(i)"
    >
      <v-menu
        tile
        open-on-hover
        offset-y
        min-width="100vw"
        :disabled="!v.list"
        :close-on-content-click="false"
        content-class="category-menu__content"
      >
        <template #activator="{ on, attrs }">
          <div
            style="width: 100%; height: 100%"
            class="d-flex justify-center align-center"
            v-bind="attrs"
            v-on="on"
          >
            {{ v.name }}
          </div>
        </template>
        <v-divider></v-divider>

        <div v-if="v.list && v.list.length > 0" class="px-11 py-4">
          <v-chip-group
            v-model="currSecondaryCategory"
            active-class="secondary--text"
            column
            @change="handleSecondaryCategoryChange(v.id)"
          >
            <v-chip v-for="e in v.list" :key="e.id" :value="e.id">
              <div style="min-width: 90px" class="text-center">
                {{ e.name }}
              </div>
            </v-chip>
          </v-chip-group>
        </div>
      </v-menu>
    </v-tab>
  </v-tabs>
</template>

<script lang="ts">
import { defineComponent, onMounted, useRoute, computed } from '#imports'
import useProducts from '~~/packages/composables/logic/useProducts'
import useCategory from '~~/packages/composables/logic/useCategory'
import { useSiteStore } from '~/store/site'

export default defineComponent({
  setup() {
    const route = useRoute()
    const routeName = computed(() => route.name)
    const SiteStore = useSiteStore()

    const {
      categoryItems,
      fetchCategories,
      currTopCategoryIndex,
      currSecondaryCategory,
    } = useCategory()

    const { productsData, updateProductsData } = useProducts()

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

      SiteStore.SET_GOODS_LIST_SEARCH_PARAMS_TOPCATEGORY(
        categoryItems.value[index].id
      )

      SiteStore.SET_GOODS_LIST_SEARCH_PARAMS_SECONDARY_CATEGORY(0)

      updateProductsData(true)
    }

    // 切换次分类
    const handleSecondaryCategoryChange = (pid: number) => {
      SiteStore.SET_GOODS_LIST_SEARCH_PARAMS_KEYWORD('')

      SiteStore.SET_TOP_CATEGORY_INDEX(
        categoryItems.value.findIndex((v) => v.id === pid)
      )

      SiteStore.SET_GOODS_LIST_SEARCH_PARAMS_TOPCATEGORY(pid)

      updateProductsData(true)
    }

    return {
      productsData,
      categoryItems,
      currTopCategoryIndex,
      currSecondaryCategory,
      handleTopCategoryChange,
      handleSecondaryCategoryChange,
    }
  },
})
</script>

<style lang="scss" scoped>
.top-category {
  .v-tab {
    font-size: 0.95rem;
  }

  &--active {
    background-color: rgba($color: #1abc9c, $alpha: 0.17);
  }
}

.category-menu {
  &__content {
    background-color: #fff;
    box-shadow: none;
  }
}
</style>
