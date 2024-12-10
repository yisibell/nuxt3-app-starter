<template>
  <div class="login-container bg-appbody">
    <div>
      <!-- <v-img
        class="mx-auto my-6"
        max-width="228"
        src="https://cdn.vuetifyjs.com/docs/images/logos/vuetify-logo-v3-slim-text-light.svg"
      /> -->

      <div class="text-center mb-6 text-h4">
        <span>面辅料采购网</span>
      </div>

      <v-card
        min-width="500"
        rounded
        elevation="16"
        class="pa-6"
      >
        <v-card-title class="d-flex justify-center">
          用户登录
        </v-card-title>

        <div class="px-4">
          <v-divider />
        </div>

        <v-alert
          v-model="errorAlertVisible"
          type="error"
          density="compact"
          class="ma-4"
        >
          {{ errorAlertMessage }}
        </v-alert>

        <v-card-text>
          <v-form
            v-model="valid"
            @submit.prevent="handleLogin"
          >
            <v-text-field
              v-model="form.username"
              :rules="rules.username"
              prepend-inner-icon="mdi-account"
              variant="outlined"
              label="用户账号"
              clearable
              class="mb-2"
              color="primary"
            />

            <v-text-field
              v-model="form.password"
              :rules="rules.password"
              type="password"
              prepend-inner-icon="mdi-lock"
              label="登录密码"
              required
              clearable
              variant="outlined"
              class="mb-4"
              color="primary"
            />

            <v-btn
              :loading="submitLoading"
              type="submit"
              class="bg-primary"
              block
              size="x-large"
            >
              登 录
            </v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </div>

    <ReceiptNotice
      v-model="receiptNoticeVisible"
      :order-sns="willReceivedOrders"
      @close="handleReceiptNoticeClose"
    />
  </div>
</template>

<script setup lang="ts">
import { useSiteStore } from '~/store/site'
import { useNoticeStore } from '~/store/notice'
import { useUserApi } from '~/composables/api/modules/user'
import ReceiptNotice from '~/explicit-components/views/login/ReceiptNotice.vue'

definePageMeta({
  layout: 'custom',
  title: '登录',
})

const route = useRoute()

useHead({
  title: route.meta.title as string,
})

const valid = ref(false)

const form = ref({
  username: '',
  password: '',
})

const rules = {
  username: [(v: string) => !!v || '请输入用户账号'],
  password: [(v: string) => !!v || '请输入登录密码'],
}

const SiteStore = useSiteStore()

const submitLoading = ref(false)
const errorAlertVisible = ref(false)
const errorAlertMessage = ref('')

const receiptNoticeVisible = ref(false)
const willReceivedOrders = computed(() => NoticeStore.willReceivedOrders)

const NoticeStore = useNoticeStore()

const UserApi = useUserApi()

const handleLogin = async () => {
  if (valid.value) {
    try {
      submitLoading.value = true
      const { code, data } = await UserApi.login(form.value)
      if (code === 0) {
        errorAlertMessage.value = ''
        errorAlertVisible.value = false

        SiteStore.SET_TOKEN(data.accessToken)

        const orders = await NoticeStore.fetchWillReceivedOrders()

        if (orders.length) {
          receiptNoticeVisible.value = true
        }
        else {
          navigateTo('/')
        }
      }
      else {
        errorAlertMessage.value = '用户名或密码不正确!'
        errorAlertVisible.value = true
      }
    }
    finally {
      submitLoading.value = false
    }
  }
}

const handleReceiptNoticeClose = () => {
  navigateTo('/')
}
</script>

<style lang="scss" scoped>
.login-container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
