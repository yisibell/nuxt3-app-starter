<template>
  <v-navigation-drawer
    v-model="visible"
    temporary
  >
    <v-list class="mt-4">
      <v-list-item
        :prepend-avatar="avatarPng"
      >
        <v-list-item-title class="text-h6">
          {{ userInfo.companyName || '-' }}
        </v-list-item-title>

        <v-list-item-subtitle>
          {{ userInfo.code || '-' }}
        </v-list-item-subtitle>

        <template #append>
          <v-btn
            icon="mdi-menu-down"
            size="small"
            variant="text"
          />
        </template>
      </v-list-item>
    </v-list>

    <v-divider />

    <v-list
      v-model:opened-valuesed="openedValues"
      nav
    >
      <template v-for="(item) in items">
        <v-list-group
          v-if="item?.items?.length"
          :key="item.value"
          :value="item.value"
        >
          <template #activator="{ props }">
            <v-list-item
              v-bind="props"
              :prepend-icon="item.icon"
            >
              <v-list-item-title class="text-caption">
                {{ item.title }}
              </v-list-item-title>
            </v-list-item>
          </template>

          <v-list-item
            v-for="(subItem, i) in item.items"
            :key="i"
            :prepend-icon="subItem.icon"
            :to="subItem.href"
            color="primary"
          >
            <v-list-item-title class="text-caption">
              {{ subItem.title }}
            </v-list-item-title>
          </v-list-item>
        </v-list-group>

        <v-list-item
          v-else
          :key="item.value+1"
          :prepend-icon="item.icon"
          :to="item.href"
          color="primary"
        >
          <v-list-item-title class="text-caption">
            {{ item.title }}
          </v-list-item-title>
        </v-list-item>
      </template>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import avatarPng from '~/assets/images/avatar.png'
import { useAccountStore } from '~/store/account'

interface IListItem {
  title: string
  icon: string
  value: string
  href?: string
  items?: IListItem[]
}

const AccountStore = useAccountStore()

const visible = defineModel({ type: Boolean })

const openedValues = ref<string[]>(['account'])

const items: IListItem[] = [
  {
    title: '首页',
    icon: 'mdi-home',
    href: '/',
    value: 'home',
  },
  {
    title: '账户',
    icon: 'mdi-account',
    value: 'account',
    items: [
      {
        title: '账户信息',
        href: '/account/info',
        icon: '',
        value: 'account-info',
      },
    ],
  },
  {
    title: '我的购物车',
    icon: 'mdi-shopping',
    href: '/cart',
    value: 'cart',
  },
  {
    title: '我的订单',
    icon: 'mdi-order-bool-ascending',
    href: '/order/list',
    value: 'order-list',
  },
  {
    title: '我的退货',
    icon: 'mdi-backup-restore',
    href: '/order/return-list',
    value: 'return-list',
  },
]

const userInfo = computed(() => AccountStore.info)

onMounted(() => {
  AccountStore.fetchUserInfo()
})
</script>
