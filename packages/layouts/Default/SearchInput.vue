<template>
  <v-menu offset-y :value="showMenu">
    <template #activator="{ on, attrs }">
      <v-text-field
        v-model.trim="formKeyword"
        light
        color="secondary"
        append-icon="mdi-magnify"
        background-color="white"
        outlined
        dense
        hide-details
        rounded
        clearable
        class="app-bar__search-input mr-4"
        v-bind="attrs"
        @click:append="handleEnter"
        @keydown.enter.prevent="handleEnter"
        v-on="on"
      >
        <template #prepend-inner>
          <v-select
            v-model="formType"
            :items="searchTypeOptions"
            :height="20"
            color="secondary"
            item-color="secondary"
            dense
            light
            class="app-bar__search-input__type"
            hide-details
          ></v-select>
        </template>
      </v-text-field>
    </template>

    <v-card v-show="showMenu" class="pl-2">
      <v-virtual-scroll
        :items="goodsNumberComboboxItems"
        height="480"
        item-height="40"
        class="scrollbar--primary"
      >
        <template #default="{ item }">
          <v-list-item
            :key="item.value"
            dense
            class="cursor-pointer"
            @click="handleFuzzyMatch(item.value)"
          >
            <v-list-item-title>{{ item.text }}</v-list-item-title>
          </v-list-item>

          <v-divider></v-divider>
        </template>
      </v-virtual-scroll>
    </v-card>
  </v-menu>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref, useNuxtApp } from '#imports'

import useProducts from '~~/packages/composables/logic/useProducts'
import { useSiteStore } from '~/store/site'

export default defineComponent({
  setup() {
    const { $api } = useNuxtApp()
    const SiteStore = useSiteStore()

    const formType = computed({
      get() {
        return SiteStore.goodsListSearchParams.type
      },
      set(val: number) {
        SiteStore.SET_GOODS_LIST_SEARCH_PARAMS_TYPE(val)
      },
    })

    const formKeyword = computed<string>({
      get() {
        return SiteStore.goodsListSearchParams.keyword || ''
      },
      set(val) {
        SiteStore.SET_GOODS_LIST_SEARCH_PARAMS_KEYWORD(val)
      },
    })

    const { updateProductsData, searchTypeOptions } = useProducts()
    const handleEnter = () => {
      updateProductsData(true)
    }

    const handleFuzzyMatch = (value: string) => {
      formKeyword.value = value
      handleEnter()
    }

    const showMenu = computed(
      () => goodsNumberComboboxItems.value.length > 0 && formType.value === 1
    )

    const goodsNumberList = ref<string[]>([])
    const goodsNumberComboboxItems = computed(() => {
      return goodsNumberList.value
        .filter(
          (e) =>
            formKeyword.value &&
            new RegExp(`${formKeyword.value.toLowerCase()}`).test(
              e.toLowerCase()
            )
        )
        .map((v) => ({ text: v, value: v }))
    })

    const fetchGoodsNumberList = async () => {
      const { code, data } = await $api.goods.getGoodsNumberAll()
      if (code === 0) {
        goodsNumberList.value = data.numberList
      }
    }

    onMounted(() => {
      fetchGoodsNumberList()
    })

    return {
      showMenu,
      handleFuzzyMatch,
      goodsNumberComboboxItems,
      goodsNumberList,
      searchTypeOptions,
      formKeyword,
      formType,
      handleEnter,
    }
  },
})
</script>

<style lang="scss" scoped>
.app-bar__search-input {
  flex: none;
  width: 420px;

  &__type {
    width: 76px;
  }

  :deep() {
    input {
      color: #9e9e9e;
    }

    .v-select__selection {
      color: #9e9e9e;
      font-size: 12px;
      overflow: visible;
    }
  }
}
</style>
