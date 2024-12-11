<template>
  <v-dialog
    v-model="visible"
    width="600"
  >
    <template #activator="buySlot">
      <v-btn
        color="primary"
        variant="elevated"
        v-bind="buySlot.props"
      >
        再次购买
      </v-btn>
    </template>

    <v-card>
      <v-card-title class="bg-grey-lighten-2">
        再次加购
      </v-card-title>

      <v-card-text class="py-3">
        <VcTreeTable
          :data="tableData"
          :columns="columns"
          border
          @selection-change="handleSelectionChange"
        >
          <template #left>
            <el-table-column
              type="selection"
              align="center"
              width="50"
            />
          </template>

          <template #column-code="{ row }">
            <BaseGoodsInfo :data="row" />
          </template>

          <template #column-quantity="{ row }">
            <v-menu
              open-on-hover
              offset-y
              :close-on-click="false"
              :close-on-content-click="false"
              :disabled="!row.clothSeedList"
            >
              <template #activator="qSlot">
                <div
                  v-bind="qSlot.props"
                >
                  <VcInputNumber
                    v-model="row.quantity"
                    :disabled="!!row.clothSeedList"
                    :min="1"
                  />
                  <span>{{ getGoodsUnit(row) }}</span>
                </div>
              </template>

              <v-card flat>
                <v-card-text
                  v-for="(v, i) in row.clothSeedList"
                  :key="i"
                  class="d-flex align-center"
                >
                  <div
                    class="mr-2 text-center"
                    style="min-width: 50px"
                  >
                    {{ v.name }}
                  </div>
                  <VcInputNumber
                    v-model="v.quantity"
                    :min="1"
                    @change="handleClothSeedQuantityChange(row)"
                  />
                </v-card-text>
              </v-card>
            </v-menu>
          </template>
        </VcTreeTable>
      </v-card-text>

      <v-divider />

      <v-card-actions>
        <v-spacer />
        <v-btn
          color="primary"
          variant="elevated"
          :disabled="selectedArr.length <= 0"
          :loading="loading"
          @click="handleAddToCart"
        >
          加入购物车
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { cloneDeep } from 'lodash-es'
import type { IOrderDetailInfo } from '~/composables/api/interfaces/order'
import type { IAddCartParams } from '~/composables/api/interfaces/cart'
import { useCartStore } from '~/store/cart'
import { useCartApi } from '~/composables/api/modules/cart'

type OrderGoodsList = IOrderDetailInfo['list']

const props = withDefaults(defineProps<{
  goodsList: OrderGoodsList
}>(), {})

const { goodsList } = toRefs(props)

const CartStore = useCartStore()
const CartApi = useCartApi()

const tableData = computed(() => cloneDeep(goodsList.value))

const visible = ref(false)
const setVisible = (show: boolean) => {
  visible.value = show
}

const columns = [
  { align: 'center', label: '商品信息', prop: 'code' },
  { align: 'center', label: '数量', prop: 'quantity' },
]

const selectedArr = ref<OrderGoodsList>([])
const handleSelectionChange = (arr: OrderGoodsList) => {
  selectedArr.value = arr
}

const loading = ref(false)

const getAddCartParamsList = () => {
  return selectedArr.value.reduce((res, v) => {
    const base = {
      goodsId: v.goodsId,
      color: v.colorEn,
      size: v.size,
      specs: v.specsId,
    }

    if (v.clothSeedList && v.clothSeedList.length > 0) {
      v.clothSeedList.forEach((e) => {
        res.push({
          ...base,
          quantity: e.quantity,
          clothSeed: e.clothSeedId || 0,
        })
      })
    }
    else {
      res.push({
        ...base,
        quantity: v.quantity,
        clothSeed: v.clothSeedId || 0,
      })
    }

    return res
  }, [] as IAddCartParams[])
}

const handleAddToCart = async () => {
  try {
    loading.value = true

    const params = {
      list: getAddCartParamsList(),
    }

    const { code, msg } = await CartApi.add(params)

    if (code === 0) {
      await CartStore.fetchCartList()

      $layer.toast('加入购物车成功!')

      setVisible(false)
    }
    else {
      $layer.toast(msg || '操作失败!', { icon: 'error' })
    }
  }
  finally {
    loading.value = false
  }
}

const getGoodsUnit = (row: OrderGoodsList[0]) => {
  if (row.specsList && row.specsList.length > 0) {
    return row.specsList.find(v => v.value === row.specsId)?.name
  }

  return row.unit
}

const handleClothSeedQuantityChange = (row: OrderGoodsList[0]) => {
  row.quantity
    = row.clothSeedList?.reduce((num, v) => {
      num += v.quantity
      return num
    }, 0) || row.quantity
}
</script>
