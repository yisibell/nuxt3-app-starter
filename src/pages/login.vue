<template>
  <div class="login-container bg-appbody">
    <v-card :width="500" :elevation="12" rounded :loading="loading">
      <div class="pa-6">
        <v-card-title class="d-flex justify-center"> 用户登录 </v-card-title>

        <div class="px-4">
          <v-divider></v-divider>
        </div>

        <div class="py-2">
          <v-scale-transition>
            <v-alert
              v-model="errorAlertVisible"
              type="error"
              density="compact"
              closable
            >
              {{ errorAlertMessage }}
            </v-alert>
          </v-scale-transition>
        </div>

        <v-card-text>
          <v-form
            ref="formVNode"
            v-model="valid"
            validate-on="lazy"
            @submit.prevent="handleLogin"
          >
            <v-text-field
              v-model="form.username"
              :rules="rules.username"
              label="用户账号"
              prepend-inner-icon="mdi-account"
              required
              variant="outlined"
              clearable
              maxlength="20"
              validate-on="blur"
              class="mb-4"
            ></v-text-field>

            <v-text-field
              v-model="form.password"
              :rules="rules.password"
              type="password"
              prepend-inner-icon="mdi-lock"
              label="登录密码"
              required
              variant="outlined"
              clearable
              maxlength="20"
              validate-on="blur"
              class="mb-4"
            ></v-text-field>

            <v-btn
              :loading="loading"
              type="submit"
              color="primary"
              block
              size="x-large"
            >
              登 录
            </v-btn>
          </v-form>
        </v-card-text>
      </div>
    </v-card>

    <ReceiptNotice
      v-model="receiptNoticeVisible"
      :order-sns="willReceivedOrders"
      @close="handleReceiptNoticeClose"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref, useRouter, computed } from '#imports'
import type { IVFormInstance } from '~~/packages/types/vuetify/form'
import ReceiptNotice from '~/explicit-components/views/login/ReceiptNotice.vue'
import { useNoticeStore } from '~/store/notice'
import { useSiteStore } from '~/store/site'

definePageMeta({
  layout: 'simple',
})

const { $api } = useNuxtApp()

const form = ref({
  username: '',
  password: '',
})

const rules = {
  username: [(v: string) => !!v || '请输入用户账号'],
  password: [(v: string) => !!v || '请输入登录密码'],
}

const valid = ref(true)
const loading = ref(false)
const formVNode = ref(null)
const errorAlertVisible = ref(false)
const errorAlertMessage = ref('')

const SiteStore = useSiteStore()
const NoticeStore = useNoticeStore()
const router = useRouter()

const receiptNoticeVisible = ref(false)
const willReceivedOrders = computed(() => NoticeStore.willReceivedOrders)

const handleLogin = async () => {
  const formInstance = formVNode.value

  if (formInstance) {
    const validRes = await (formInstance as IVFormInstance).validate()
    valid.value = validRes.valid

    if (!valid.value) return

    try {
      loading.value = true
      const { code, data } = await $api.user.login(form.value)

      if (code === 0) {
        errorAlertMessage.value = ''
        errorAlertVisible.value = false

        SiteStore.SET_TOKEN(data.accessToken)

        const orders = await NoticeStore.fetchWillReceivedOrders()

        if (orders.length > 0) {
          receiptNoticeVisible.value = true
        } else {
          router.push('/')
        }
      } else {
        errorAlertMessage.value = '用户名或密码不正确!'
        errorAlertVisible.value = true
      }
    } finally {
      loading.value = false
    }
  }
}

const handleReceiptNoticeClose = () => {
  router.push('/')
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
