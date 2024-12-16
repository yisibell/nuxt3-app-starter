<template>
  <v-menu
    location="bottom center"
    :offset="4"
    :close-on-content-click="false"
    open-on-click
  >
    <template #activator="{ props }">
      <v-text-field
        v-model.trim="formKeyword"
        placeholder="搜索"
        color="secondary"
        append-inner-icon="mdi-magnify"
        variant="solo"
        density="compact"
        hide-details
        rounded
        clearable
        class="app-bar__search-input mr-4"
        v-bind="props"
        @update:focused="handleInputFocused"
        @click:append-inner="handleEnter"
        @keydown.enter.prevent="handleEnter"
      >
        <template #prepend-inner>
          <v-menu location="bottom center">
            <template #activator="typeMenuAC">
              <v-btn
                size="small"
                v-bind="typeMenuAC.props"
              >
                {{ getFormTypeLabel(formType) }}
                <v-icon
                  icon="mdi-menu-down"
                  end
                />
              </v-btn>
            </template>

            <v-card>
              <v-list
                density="compact"
              >
                <v-list-item
                  v-for="(item, index) in searchTypeOptions"
                  :key="index"
                  :value="item.value"
                  color="secondary"
                  @click="handleFormTypeChange(item.value)"
                >
                  <v-list-item-title>
                    <v-btn
                      block
                      size="small"
                      variant="plain"
                      :color="formType === item.value ?'secondary':''"
                    >
                      {{ item.text }}
                    </v-btn>
                  </v-list-item-title>
                </v-list-item>
              </v-list>
            </v-card>
          </v-menu>
        </template>
      </v-text-field>
    </template>

    <v-card
      elevation="8"
    >
      <HistorySearch
        :type="formType"
        @search="handleFuzzyMatch"
      />
      <GuessSearch
        v-if="formType === 1"
        :items="goodsNumberComboboxItems"
        @search="handleFuzzyMatch"
      />
    </v-card>
  </v-menu>
</template>

<script setup lang="ts">
import HistorySearch from './HistorySearch.vue'
import GuessSearch from './GuessSearch.vue'
import useProducts from '~/composables/logic/useProducts'
import { useSiteStore } from '~/store/site'
import { useGoodsApi } from '~/composables/api/modules/goods'

const SiteStore = useSiteStore()
const GoodsApi = useGoodsApi()

const formType = computed({
  get() {
    return SiteStore.goodsListSearchParams.type
  },
  set(val) {
    SiteStore.SET_GOODS_LIST_SEARCH_PARAMS_TYPE(val)
  },
})

const getFormTypeLabel = (value: number) => {
  return searchTypeOptions.find(v => v.value === value)?.text
}

const handleFormTypeChange = (type: number) => {
  formType.value = type
}

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

const inputFocused = ref(false)

const handleInputFocused = (focused: boolean) => {
  inputFocused.value = focused
}

const goodsNumberList = ref<string[]>([])
const goodsNumberComboboxItems = computed(() => {
  return goodsNumberList.value
    .filter(
      e =>
        formKeyword.value
        && new RegExp(`${formKeyword.value.toLowerCase()}`).test(
          e.toLowerCase(),
        ),
    )
    .map(v => ({ text: v, value: v }))
})

const fetchGoodsNumberList = async () => {
  const { code, data } = await GoodsApi.getGoodsNumberAll()
  if (code === 0) {
    goodsNumberList.value = data.numberList
  }
}

onMounted(() => {
  fetchGoodsNumberList()
})
</script>

<style lang="scss" scoped>
.app-bar__search-input {
  flex: none;
  width: 450px;

  :deep() {
    input {
      color: #9e9e9e;
    }
  }
}
</style>
