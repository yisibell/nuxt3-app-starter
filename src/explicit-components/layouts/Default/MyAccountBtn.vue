<template>
  <v-menu
    transition="slide-y-transition"
    bottom
    offset-y
    open-on-hover
  >
    <template #activator="{ props }">
      <v-btn
        icon
        v-bind="props"
      >
        <v-icon>mdi-account</v-icon>
      </v-btn>
    </template>

    <v-card>
      <v-list density="compact">
        <v-list-item>
          <v-btn
            block
            size="small"
            variant="text"
            @click="handleToAccountPage"
          >
            <span class="text-caption">账户信息</span>
          </v-btn>
        </v-list-item>
        <v-list-item>
          <v-btn
            block
            size="small"
            variant="text"
            @click="handleToOrderPage"
          >
            <span class="text-caption">我的订单</span>
          </v-btn>
        </v-list-item>
        <v-list-item>
          <v-btn
            block
            size="small"
            variant="text"
            @click="handleToOrderReturnListPage"
          >
            <span class="text-caption">我的退货</span>
          </v-btn>
        </v-list-item>
        <v-divider />
        <v-list-item>
          <v-btn
            block
            size="small"
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

<script setup lang="ts">
import { $layer } from '~/utils/layer'
import { useSiteStore } from '~/store/site'
import { useUserApi } from '~/composables/api/modules/user'

const router = useRouter()
const SiteStore = useSiteStore()
const UserApi = useUserApi()

const logoutLoading = ref(false)
const handleLogout = () => {
  $layer.confirm('确认要登出吗?').then(async ({ isConfirmed }) => {
    if (isConfirmed) {
      try {
        logoutLoading.value = true
        const { code } = await UserApi.logout()

        if (code === 0) {
          SiteStore.SET_TOKEN('')
          router.replace('/login')
        }
      }
      finally {
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
</script>
