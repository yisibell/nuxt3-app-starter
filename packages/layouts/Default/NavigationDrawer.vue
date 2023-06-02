<template>
  <v-navigation-drawer :value="visible" app temporary @input="handleInput">
    <v-list>
      <v-list-item>
        <v-list-item-avatar>
          <v-img src="/avatar.png"></v-img>
        </v-list-item-avatar>
      </v-list-item>

      <v-list-item link>
        <v-list-item-content>
          <v-list-item-title class="text-h6">
            {{ userInfo.companyName || '-' }}
          </v-list-item-title>
          <v-list-item-subtitle>
            {{ userInfo.code || '-' }}
          </v-list-item-subtitle>
        </v-list-item-content>

        <v-list-item-action>
          <v-icon>mdi-menu-down</v-icon>
        </v-list-item-action>
      </v-list-item>
    </v-list>
    <v-divider></v-divider>
    <v-list nav dense>
      <template v-for="(item, i) in items">
        <v-list-group
          v-if="item.items && item.items.length > 0"
          :key="item.title"
          v-model="item.active"
          :prepend-icon="item.action"
          no-action
        >
          <template #activator>
            <v-list-item-content>
              <v-list-item-title>
                {{ item.title }}
              </v-list-item-title>
            </v-list-item-content>
          </template>

          <v-list-item
            v-for="child in item.items"
            :key="child.title"
            :to="child.href"
          >
            <v-list-item-content>
              <v-list-item-title> {{ child.title }} </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>

        <v-list-item v-else :key="i" :to="item.href">
          <v-list-item-icon>
            <v-icon>{{ item.action }}</v-icon>
          </v-list-item-icon>
          <v-list-item-title>
            {{ item.title }}
          </v-list-item-title>
        </v-list-item>
      </template>
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  watch,
  toRefs,
  onMounted,
  computed,
} from '#imports'
import { useAccountStore } from '~/store/account'

export default defineComponent({
  props: {
    modelValue: Boolean,
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const { modelValue } = toRefs(props)
    const visible = ref(modelValue.value)

    watch(modelValue, (val) => {
      visible.value = val
    })

    const handleInput = (val: boolean) => {
      emit('update:modelValue', val)
    }

    const items = [
      {
        title: '首页',
        action: 'mdi-home',
        href: '/',
      },
      {
        title: '账户',
        action: 'mdi-account',
        active: true,
        items: [{ title: '账户信息', href: '/account/info' }],
      },
      {
        title: '我的购物车',
        action: 'mdi-cart',
        href: '/cart',
      },
      {
        title: '我的订单',
        action: 'mdi-order-bool-ascending',
        href: '/order/list',
      },
      {
        title: '我的退货',
        action: 'mdi-backup-restore',
        href: '/order/return-list',
      },
    ]

    const AccoutnStore = useAccountStore()

    const userInfo = computed(() => AccoutnStore.info)

    onMounted(() => {
      AccoutnStore.fetchUserInfo()
    })

    return {
      userInfo,
      visible,
      handleInput,
      items,
    }
  },
})
</script>
