<template>
  <v-menu transition="slide-y-transition" bottom offset-y open-on-hover>
    <template #activator="{ on, attrs }">
      <v-btn icon v-bind="attrs" v-on="on">
        <v-icon>mdi-account</v-icon>
      </v-btn>
    </template>

    <v-card>
      <v-list dense>
        <v-list-item>
          <v-btn block small text @click="handleToAccountPage">
            <span class="text-caption">账户信息</span>
          </v-btn>
        </v-list-item>
        <v-list-item>
          <v-btn block small text @click="handleToOrderPage">
            <span class="text-caption">我的订单</span>
          </v-btn>
        </v-list-item>
        <v-list-item>
          <v-btn block small text @click="handleToOrderReturnListPage">
            <span class="text-caption">我的退货</span>
          </v-btn>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item>
          <v-btn
            block
            small
            plain
            :loading="logoutLoading"
            @click="handleLogout"
          >
            <span class="text-caption">登 出</span>
          </v-btn>
        </v-list-item>
      </v-list>
    </v-card>
  </v-menu>
</template>

<script lang="ts">
import { defineComponent, ref, useNuxtApp, useRouter } from '#imports'
import { useSiteStore } from '~/store/site'

export default defineComponent({
  setup() {
    const { $layer, $api } = useNuxtApp()
    const SiteStore = useSiteStore()
    const router = useRouter()

    const logoutLoading = ref(false)
    const handleLogout = () => {
      $layer.confirm('确认要登出吗?').then(async ({ isConfirmed }) => {
        if (isConfirmed) {
          try {
            logoutLoading.value = true
            const { code } = await $api.user.logout()

            if (code === 0) {
              SiteStore.SET_TOKEN('')
              router.replace('/login')
            }
          } finally {
            logoutLoading.value = false
          }
        }
      })
    }

    const handleToAccountPage = () => {
      router.push({ name: 'account-info' })
    }

    const handleToOrderPage = () => {
      router.push({ name: 'order-list' })
    }

    const handleToOrderReturnListPage = () => {
      router.push({ name: 'order-return-list' })
    }

    return {
      logoutLoading,
      handleLogout,
      handleToAccountPage,
      handleToOrderPage,
      handleToOrderReturnListPage,
    }
  },
})
</script>
