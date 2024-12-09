import { cloneDeep } from 'lodash-es'
import type {
  IGoodsDetailObject,
  IGoodsDetailColorObject,
  IGoodsDetailAttrObject,
  IGoodsDetailSpecsObject,
  IGoodsDetailClothSeedObject,
  IOptimalPriceRes,
  IGoodsMoqRes,
  IGoodsStockRes,
} from '~/composables/api/interfaces/goods'
import type { IAddCartParams } from '~/composables/api/interfaces/cart'
import { $layer } from '~/utils/layer'
import { useGoodsApi } from '~/composables/api/modules/goods'
import { useCartApi } from '~/composables/api/modules/cart'
import { useCartStore } from '~/store/cart'

type IUpdateDynamicAttr = (
  type: 1 | 2 | 3 | 4,
  keyword?: string | number
) => void

export const UpdateDynamicAttrSymbol: InjectionKey<IUpdateDynamicAttr>
  = Symbol('动态更新商品可选属性')

export const AddToCartFormInjectionSymbol: InjectionKey<Ref<IAddCartParams>>
  = Symbol('add-to-cart-form')

export const UpdateDynamicPriceInjectionSymbol: InjectionKey<
  () => Promise<void>
> = Symbol('update-dynamic-price')

export const SetFormQuantityInjectionSymbol: InjectionKey<
  (val: number) => void
> = Symbol('set-form-quantity')

export const SetFormSizeInjecttionSymbol: InjectionKey<(val: string) => void>
  = Symbol('set-form-size')

export const SetFormSpecsInjecttionSymbol: InjectionKey<(val: number) => void>
  = Symbol('set-form-specs')

export const SetFormColorInjecttionSymbol: InjectionKey<(val: string) => void>
  = Symbol('set-form-color')

export const SetFormClothSeedInjecttionSymbol: InjectionKey<
  (val: number) => void
> = Symbol('set-cloth-seed')

export const UpdateDynamicOptimalPriceInjectionSymbol: InjectionKey<
  () => void
> = Symbol('update-dynamic-optimal-price')

export const DynamicOptimalPriceInjectionSymbol: InjectionKey<
  Ref<IOptimalPriceRes>
> = Symbol('dynamic-optimal-rice')

export const GoodsMoqInfoInjectionSymbol: InjectionKey<IGoodsMoqRes>
  = Symbol('最低起订量信息')
export const GetGoodsMoqInfoInjectionSymbol: InjectionKey<() => void>
  = Symbol('获取最低起订量信息')

/**
 * 加购逻辑
 */
const useAddToCart = (
  goodsDetail: Ref<IGoodsDetailObject>,
  goodsId: number,
  searchId?: number,
) => {
  const GoodsApi = useGoodsApi()
  const CartApi = useCartApi()
  const CartStore = useCartStore()

  const form = ref<IAddCartParams>({
    searchId,
    goodsId,
    quantity: 1,
    color: '',
    size: '',
    specs: 0,
    clothSeed: 0,
  })

  const setFormQuantity = (val: number = 1) => {
    form.value.quantity = val
  }

  const setFormSize = (val: string = '') => {
    form.value.size = val
  }

  const setFormSpecs = (val: number) => {
    form.value.specs = val
  }

  const setFormColor = (val: string) => {
    form.value.color = val
  }

  const setFormClothSeed = (val: number) => {
    form.value.clothSeed = val
  }

  // 一级分类
  const primaryCategory = computed(() => goodsDetail.value.primaryCategory)
  const secondaryCategory = computed(() => goodsDetail.value.secondaryCategory)

  // 规格提示
  const specsTips = computed(() => {
    if (
      primaryCategory.value === 6
      && form.value.specs === 2
      && specsItems.value.length > 1
    ) {
      return '单次购买大于100米时，请直接选购“整支”规格'
    }
  })

  // 数量最大数值
  const maxQuantity = computed(() => {
    // 面料按整米购买限制最大值
    if (primaryCategory.value === 6 && form.value.specs === 2) {
      return 100
    }

    return 99999
  })

  // 数量步数控制
  const stepQuantity = computed(() => {
    // 面料按整米购买控制递增步数
    if (primaryCategory.value === 6 && form.value.specs === 2) {
      return 0.5
    }

    return 1
  })

  // 数量严格步数
  const strictStepQuantity = computed(() => {
    // 面料按整米购买控制严格步数
    if (primaryCategory.value === 6 && form.value.specs === 2) {
      return true
    }

    return false
  })

  // 商品属性
  const defaultColors = computed(() => cloneDeep(goodsDetail.value.color || []))
  const defaultSizes = computed(() =>
    cloneDeep(goodsDetail.value.sizeList || []),
  )
  const defaultSpecs = computed(() =>
    cloneDeep(goodsDetail.value.specsList || []),
  )
  const defaultClothSeeds = computed(() =>
    cloneDeep(goodsDetail.value.clothSeedList || []),
  )

  const dynamicAttrMap = ref<{
    color: IGoodsDetailColorObject[]
    size: IGoodsDetailAttrObject[]
    specs: IGoodsDetailSpecsObject[]
    clothSeeds: IGoodsDetailClothSeedObject[]
    [propName: string]: any
  }>({
    color: defaultColors.value,
    size: defaultSizes.value,
    specs: defaultSpecs.value,
    clothSeeds: defaultClothSeeds.value,
  })
  const colorItems = computed(() =>
    dynamicAttrMap.value.color.map(v => ({
      name: `${v.name}(${v.enName})`,
      value: v.enName,
    })),
  )
  const sizeItems = computed(() => dynamicAttrMap.value.size)
  const specsItems = computed(() => dynamicAttrMap.value.specs)
  const clothSeedItems = computed(() =>
    dynamicAttrMap.value.clothSeeds.map(v => ({ name: v.name, value: v.id })),
  )

  watch(defaultColors, (val) => {
    dynamicAttrMap.value.color = val
    if (val.length === 1) {
      form.value.color = val[0].enName
      getGoodsMoqInfo()
      updateDynamicPrice()
    }
  })

  watch(defaultSizes, (val) => {
    dynamicAttrMap.value.size = val
    if (val.length === 1) {
      form.value.size = val[0].value
      updateDynamicPrice()
    }
  })

  watch(defaultSpecs, (val) => {
    dynamicAttrMap.value.specs = val
    if (val.length === 1) {
      form.value.specs = val[0].value
      updateDynamicPrice()
    }
  })

  watch(defaultClothSeeds, (val) => {
    dynamicAttrMap.value.clothSeeds = val

    if (val.length > 0) {
      form.value.clothSeed = val[0].id
    }
  })

  const updateDynamicAttr: IUpdateDynamicAttr = async (type, keyword) => {
    if (!form.value.color && !form.value.size && !form.value.specs) {
      dynamicAttrMap.value.color = cloneDeep(defaultColors.value)
      dynamicAttrMap.value.size = cloneDeep(defaultSizes.value)
      dynamicAttrMap.value.specs = cloneDeep(defaultSpecs.value)
    }
    else {
      const params = {
        type,
        keyword,
        number: goodsDetail.value.code,
        primaryCategory: goodsDetail.value.primaryCategory,
        secondaryCategory: goodsDetail.value.secondaryCategory,
      }

      const { code, data } = await GoodsApi.attribute(params)

      if (code === 0) {
        const { list } = data || {}
        const dataList = Array.isArray(list) ? list : []

        switch (type) {
          case 1:
            dynamicAttrMap.value.color = dataList.map(v => ({
              name: v.name,
              enName: v.value,
            }))
            break
          case 2:
            dynamicAttrMap.value.size = dataList
            break
          case 3:
            dynamicAttrMap.value.color = dataList.map(v => ({
              name: v.name,
              enName: v.value,
            }))
            break
          case 4:
            dynamicAttrMap.value.specs = dataList.map(v => ({
              name: v.name,
              value: Number.parseInt(v.value),
            }))
            break
        }
      }
    }
  }

  // 起售价
  const goodsDefaultPrice = computed(() => goodsDetail.value.price)
  // 动态价格
  const goodsDynamicPrice = ref(goodsDetail.value.price || 0)
  watch(goodsDefaultPrice, (val) => {
    goodsDynamicPrice.value = val
  })
  // 整给价格
  const goodsDynamicPriceForBatch = ref(0)
  // 整给单位
  const goodsDynamicUnitForBatch = ref('')
  // 整给数量
  const goodsDynamicNumForBatch = ref(0)

  // 是否为常备款
  const dynamicStockType = ref(false)

  const canNotUpdatePrice = (
    keyMap: { [propName: string]: string } = {
      color: 'color',
      size: 'size',
      specs: 'specs',
      clothSeed: 'clothSeeds',
    },
  ) => {
    const keys = Object.keys(keyMap)

    const notEmptyKeys = keys.filter(
      v =>
        Array.isArray(dynamicAttrMap.value[keyMap[v]])
        && dynamicAttrMap.value[keyMap[v]].length > 0,
    )

    return notEmptyKeys.some(v => !form.value[v])
  }

  // 是否显示起售价
  const showMinimumPrice = computed(() => {
    // 耗材无需动态价格
    if ([5].includes(primaryCategory.value)) return false

    return canNotUpdatePrice()
  })

  // 获取商品库存
  const goodsStockInfo = ref<IGoodsStockRes>({})
  const getGoodsStockInfo = async () => {
    const params = {
      ...form.value,
    }

    const { code, data } = await GoodsApi.getStock(params)

    if (code === 0) {
      goodsStockInfo.value = data || {}
    }
  }

  // 更新动态价格
  const updateDynamicPrice = async () => {
    goodsDynamicPrice.value = goodsDetail.value.price
    dynamicStockType.value = goodsDetail.value.stockType
    goodsDynamicPriceForBatch.value = 0
    goodsStockInfo.value.shipTime = 0

    if (canNotUpdatePrice()) return

    // 拉取库存信息
    getGoodsStockInfo()

    const params = { goodsList: [form.value] }

    const { code, data } = await GoodsApi.price(params)

    if (code === 0) {
      goodsDynamicPrice.value = data.list[0].price
      dynamicStockType.value = data.list[0].stockType
      goodsDynamicPriceForBatch.value = data.list[0].allPrice
      goodsDynamicUnitForBatch.value = data.list[0].allUnit
      goodsDynamicNumForBatch.value = data.list[0].allNum
    }
  }

  const validate = () => {
    if (sizeItems.value.length > 0 && !form.value.size) {
      $layer.toast('请选择商品尺码!', { icon: 'warning' })

      return false
    }

    if (colorItems.value.length > 0 && !form.value.color) {
      $layer.toast('请选择商品颜色!', { icon: 'warning' })

      return false
    }

    if (specsItems.value.length > 0 && !form.value.specs) {
      $layer.toast('请选择商品规格!', { icon: 'warning' })

      return false
    }

    if (clothSeedItems.value.length > 0 && !form.value.clothSeed) {
      $layer.toast('请选择商品布种!', { icon: 'warning' })

      return false
    }

    return true
  }

  const loading = ref(false)
  const handleAddToCart = async () => {
    if (!validate()) return

    try {
      loading.value = true

      const params = {
        list: [form.value],
      }

      const { code, msg } = await CartApi.add(params)

      if (code === 0) {
        await CartStore.fetchCartList()

        $layer.toast('加入购物车成功!', { icon: 'success' })
      }
      else {
        $layer.toast(msg || '操作失败!', { icon: 'error' })
      }
    }
    finally {
      loading.value = false
    }
  }

  // 动态最优价格
  const dynamicOptimalPrice = ref<IOptimalPriceRes>({
    type: 4,
  })
  const updateDynamicOptimalPrice = async () => {
    if (![1, 2, 3].includes(primaryCategory.value) || !form.value.color) {
      dynamicOptimalPrice.value.type = 4
      return
    }

    const params = {
      goodsId: form.value.goodsId,
      color: form.value.color,
      quantity: form.value.quantity,
    }

    const { code, data } = await GoodsApi.optimalPrice(params)

    if (code === 0) {
      dynamicOptimalPrice.value = data
    }
  }

  // 获取最低起订量信息
  const goodsMoqInfo = ref<IGoodsMoqRes>({})
  const getGoodsMoqInfo = async () => {
    if (![1, 2, 3].includes(primaryCategory.value) || !form.value.color) {
      goodsMoqInfo.value = {
        num: 0,
      }

      return
    }

    const params = {
      goodsId: form.value.goodsId,
      color: form.value.color,
    }

    const { code, data } = await GoodsApi.getMoq(params)

    if (code === 0) {
      goodsMoqInfo.value = data || {}
    }
  }

  onMounted(() => {
    getGoodsStockInfo()
  })

  return {
    goodsStockInfo,
    getGoodsStockInfo,
    goodsDynamicNumForBatch,
    goodsDynamicPriceForBatch,
    goodsDynamicUnitForBatch,
    strictStepQuantity,
    stepQuantity,
    specsTips,
    primaryCategory,
    secondaryCategory,
    maxQuantity,
    specsItems,
    colorItems,
    sizeItems,
    clothSeedItems,
    dynamicStockType,
    goodsDefaultPrice,
    showMinimumPrice,
    goodsDynamicPrice,
    updateDynamicPrice,
    form,
    setFormQuantity,
    setFormSize,
    setFormSpecs,
    setFormColor,
    setFormClothSeed,
    loading,
    handleAddToCart,
    updateDynamicAttr,
    dynamicOptimalPrice,
    updateDynamicOptimalPrice,
    goodsMoqInfo,
    getGoodsMoqInfo,
  }
}

export default useAddToCart
