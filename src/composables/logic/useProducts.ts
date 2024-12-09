import { useProductsStore } from '~/store/products'
import { useSiteStore } from '~/store/site'

/**
 * 商品列表数据组合逻辑
 */
const useProducts = () => {
  const route = useRoute()
  const router = useRouter()
  const ProductsStore = useProductsStore()
  const SiteStore = useSiteStore()

  const routeName = computed(() => route.name)

  const productsLoading = computed(() => ProductsStore.loading)
  const productsData = computed(() => ProductsStore.data)
  const goodsListSearchParams = computed(
    () => SiteStore.goodsListSearchParams,
  )
  const currentPage = computed<number>({
    get() {
      return SiteStore.goodsListSearchParams.page
    },
    set(index) {
      SiteStore.SET_GOODS_LIST_SEARCH_PARAMS_PAGE(index)
    },
  })
  const pageSize = computed(() => SiteStore.goodsListSearchParams.limit)
  const total = computed(() => ProductsStore.total)

  const updateProductsData = async (
    resetToFirstPage: boolean = false,
    checkRouteName: boolean = true,
  ) => {
    if (checkRouteName && routeName.value !== 'products') {
      await router.push({
        name: 'products',
      })
    }

    if (resetToFirstPage) {
      SiteStore.SET_GOODS_LIST_SEARCH_PARAMS_PAGE(1)
    }

    ProductsStore.fetchGoodsList(goodsListSearchParams.value)
  }

  const searchTypeOptions = [
    { text: '商品编号', value: 1 },
    { text: '商品GID', value: 2 },
  ]

  return {
    total,
    currentPage,
    pageSize,
    goodsListSearchParams,
    productsLoading,
    productsData,
    updateProductsData,
    searchTypeOptions,
  }
}

export default useProducts
