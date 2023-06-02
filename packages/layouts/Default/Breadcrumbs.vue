<template>
  <div class="py-4">
    <v-breadcrumbs :items="items" divider=">"></v-breadcrumbs>
  </div>
</template>

<script lang="ts">
import { defineComponent, useRoute, computed } from '#imports'
import useCategory from '~~/packages/composables/logic/useCategory'

interface IBreadcrumbsItem {
  text: string | number
  href?: string
  disabled?: boolean
}

export default defineComponent({
  setup() {
    const route = useRoute()
    const routeName = computed(() => route.name || '')
    const routeParams = computed(() => route.params as Record<string, string>)
    const { currTopCategoryName, currSecondaryCategoryName } = useCategory()

    const items = computed(() => {
      let res: IBreadcrumbsItem[] = [
        {
          text: '首页',
          href: '/',
        },
      ]

      if (['products', 'index'].includes(routeName.value as string)) {
        res.push({ text: currTopCategoryName.value, disabled: true })

        if (currSecondaryCategoryName.value) {
          res.push({ text: currSecondaryCategoryName.value, disabled: true })
        }
      } else if (routeName.value === 'products-code') {
        res.push({
          text: currTopCategoryName.value,
          href: '/products',
        })

        if (currSecondaryCategoryName.value) {
          res.push({ text: currSecondaryCategoryName.value, href: '/products' })
        }

        res.push({ text: routeParams.value.code, disabled: true })
      } else if (routeName.value === 'cart') {
        res.push({ text: '我的购物车', disabled: true })
      } else if (routeName.value === 'order') {
        res.push({ text: '我的订单', disabled: true })
      } else if (routeName.value === 'order-list') {
        res.push({ text: '我的订单', disabled: true })
        res.push({ text: '订单列表', disabled: true })
      } else if (routeName.value === 'order-return-list') {
        res.push({ text: '我的订单', href: '/order/list' })
        res.push({ text: '退货列表', disabled: true })
      } else if (routeName.value === 'order-detail') {
        res.push({ text: '我的订单', href: '/order/list' })
        res.push({ text: '订单详情', disabled: true })
      } else if (routeName.value === 'order-apply-for-return') {
        res.push({ text: '我的订单', href: '/order/list' })
        res.push({ text: '申请退货', disabled: true })
      } else if (routeName.value === 'order-view-return-info') {
        res.push({ text: '我的订单', href: '/order/list' })
        res.push({ text: '查看退货', disabled: true })
      } else if (routeName.value === 'account') {
        res.push({ text: '账户', disabled: true })
      } else if (routeName.value === 'notice-receipt') {
        res.push({ text: '收货通知', disabled: true })
      } else if (routeName.value === 'account-info') {
        res.push({ text: '账户', disabled: true })
        res.push({ text: '账户信息', disabled: true })
      } else {
        res = []
      }

      return res
    })

    return {
      items,
      currTopCategoryName,
      currSecondaryCategoryName,
    }
  },
})
</script>
