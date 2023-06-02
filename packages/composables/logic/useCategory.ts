import { computed } from '#imports'
import { ICategories } from '~~/packages/api/modules/category'
import { useSiteStore } from '~/store/site'
import { useCategoryStore } from '~/store/category'

const useCategory = () => {
  const SiteStore = useSiteStore()
  const CategoryStore = useCategoryStore()

  const categoryItems = computed<ICategories>(
    () => CategoryStore.itemsTree || []
  )

  const fetchCategories = async () => {
    await CategoryStore.fetchCategories()
  }

  const currTopCategoryIndex = computed<number>({
    get() {
      return SiteStore.topCategoryIndex
    },
    set(index) {
      SiteStore.SET_TOP_CATEGORY_INDEX(index)
    },
  })

  const currTopCategory = computed(
    () => SiteStore.goodsListSearchParams.topCategory
  )

  // 当前一级分类名
  const currTopCategoryName = computed<string>(() => {
    const item = categoryItems.value[currTopCategoryIndex.value]
    return item?.name
  })

  const currSecondaryCategory = computed({
    get() {
      return SiteStore.goodsListSearchParams.secondaryCategory || 0
    },
    set(value) {
      SiteStore.SET_GOODS_LIST_SEARCH_PARAMS_SECONDARY_CATEGORY(value || 0)
    },
  })

  const currSecondaryCategoryName = computed<string | undefined>(() => {
    const { list } = categoryItems.value[currTopCategoryIndex.value] || {}

    if (Array.isArray(list)) {
      const item = list.find((v) => v.id === currSecondaryCategory.value)
      return item?.name
    }
  })

  return {
    categoryItems,
    fetchCategories,
    currTopCategoryIndex,
    currTopCategory,
    currTopCategoryName,
    currSecondaryCategory,
    currSecondaryCategoryName,
  }
}

export default useCategory
