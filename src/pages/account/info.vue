<template>
  <div>
    <v-card
      flat
      min-height="500"
    >
      <v-card-text class="d-flex justify-space-between">
        <h1 class="text-subtitle-1 font-weight-bold">
          账户信息
        </h1>
      </v-card-text>
      <v-divider />

      <v-card-text class="d-flex justify-center">
        <div class="pt-10 text-grey-darken-1">
          <div class="mb-2">
            <span class="mr-2">公司名: </span>
            <span>{{ userInfo.companyName }}</span>
          </div>

          <div class="mb-2">
            <span class="mr-2">供应商CODE: </span>
            <span>{{ userInfo.code }}</span>
          </div>

          <div class="mb-2">
            <span class="mr-2">联系人: </span>
            <span>{{ userInfo.contactPerson }}</span>
          </div>

          <div class="mb-2">
            <span class="mr-2">联系电话: </span>
            <span>{{ userInfo.mobile }}</span>
          </div>

          <div class="mb-2">
            <span class="mr-2">公司地址: </span>
            <span>{{ userInfo.companyAddress }}</span>
          </div>

          <div class="mb-2">
            <span class="mr-2">邮编: </span>
            <span>{{ userInfo.postalCode }}</span>
          </div>
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import { useAccountStore } from '~/store/account'

definePageMeta({
  title: '账户信息',
})

const route = useRoute()

useHead({
  title: route.meta.title as string,
})

const AccountStore = useAccountStore()

const userInfo = computed(() => AccountStore.info)

onMounted(() => {
  AccountStore.fetchUserInfo()
})
</script>
