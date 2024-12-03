<template>
  <div class="login-container">
    <v-card
      min-width="500"
      rounded
    >
      <v-card-title class="d-flex justify-center">
        用户登录
      </v-card-title>

      <div class="px-4">
        <v-divider />
      </div>

      <v-card-text>
        <v-form
          v-model="valid"
          @submit.prevent="handleLogin"
        >
          <!-- <v-text-field
            v-model="form.username"
            :rules="rules.username"
            label="用户账号"
          /> -->
        </v-form>
      </v-card-text>
    </v-card>
  </div>
</template>

<script setup lang="ts">
// import { useSiteStore } from '~/store/site'
// import { useUserApi } from '~/composables/api/modules/user'

definePageMeta({
  layout: 'custom',
})

const valid = ref(false)

// const form = ref({
//   username: '',
//   password: '',
// })

// const rules = {
//   username: [(v: string) => !!v || '请输入用户账号'],
//   password: [(v: string) => !!v || '请输入登录密码'],
// }

// const router = useRouter()

// const SiteStore = useSiteStore()

// const submitLoading = ref(false)

// const { loginSubmit } = useUserApi()

// const handleLogin = async () => {
//   if (valid.value) {
//     try {
//       submitLoading.value = true
//       const { code, data } = await loginSubmit(form.value)
//       if (code === 0) {
//         SiteStore.setToken(data.accessToken)
//         navigateTo('/')
//       }
//     }
//     finally {
//       submitLoading.value = false
//     }
//   }
// }
</script>

<style lang="scss" scoped>
.login-container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
