<template>
  <div class="mb-4">
    <v-breadcrumbs
      :items="items"
      density="compact"
      class="px-0"
      color="grey-darken-1"
      icon="mdi-home"
    >
      <template #title="{ item }">
        <span class="text-caption">{{ item.title }}</span>
      </template>

      <template #divider>
        <v-icon
          icon="mdi-arrow-right"
          size="x-small"
        />
      </template>
    </v-breadcrumbs>
  </div>
</template>

<script setup lang="ts">
import useCategory from '~/composables/logic/useCategory'

interface IBreadcrumbsItem {
  title: string
  href?: string
  disabled?: boolean
}

interface IRouteParams {
  code?: string
}

const route = useRoute()
const routeName = computed(() => (route.name || '') as string)
const routeParams = computed(() => route.params as IRouteParams)
const routeMetaTitle = computed(() => route.meta.title as string)

const { currTopCategoryName, currSecondaryCategoryName } = useCategory()

const items = computed(() => {
  let res: IBreadcrumbsItem[] = [
    {
      title: '首页',
      href: '/',
    },
  ]

  if (['products', 'index'].includes(routeName.value)) {
    res.push({ title: currTopCategoryName.value, disabled: true })

    if (currSecondaryCategoryName.value) {
      res.push({ title: currSecondaryCategoryName.value, disabled: true })
    }
  }
  else if (routeName.value === 'products-code') {
    res.push({
      title: currTopCategoryName.value,
      href: '/products',
    })

    if (currSecondaryCategoryName.value) {
      res.push({ title: currSecondaryCategoryName.value, href: '/products' })
    }

    res.push({ title: routeParams.value.code || '', disabled: true })
  }
  else if (routeName.value === 'order-list') {
    res.push({ title: '我的订单', disabled: true })
    res.push({ title: routeMetaTitle.value, disabled: true })
  }
  else if (routeName.value === 'order-return-list') {
    res.push({ title: '我的订单', href: '/order/list' })
    res.push({ title: routeMetaTitle.value, disabled: true })
  }
  else if (routeName.value === 'order-detail') {
    res.push({ title: '我的订单', href: '/order/list' })
    res.push({ title: routeMetaTitle.value, disabled: true })
  }
  else if (routeName.value === 'order-apply-for-return') {
    res.push({ title: '我的订单', href: '/order/list' })
    res.push({ title: routeMetaTitle.value, disabled: true })
  }
  else if (routeName.value === 'order-view-return-info') {
    res.push({ title: '我的订单', href: '/order/list' })
    res.push({ title: routeMetaTitle.value, disabled: true })
  }
  else if (routeName.value === 'account-info') {
    res.push({ title: '账户', disabled: true })
    res.push({ title: routeMetaTitle.value, disabled: true })
  }
  else if (routeMetaTitle.value) {
    res.push({ title: routeMetaTitle.value, disabled: true })
  }
  else {
    res = []
  }

  return res
})
</script>
