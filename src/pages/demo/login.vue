<template>
  <div>
    <h3>Login Page</h3>

    <div>
      <ElForm :model="form" label-width="100px">
        <ElFormItem label="User name">
          <ElInput v-model="form.username" type="text" />
        </ElFormItem>

        <ElFormItem label="Password">
          <ElInput v-model="form.password" type="password" />
        </ElFormItem>

        <ElFormItem>
          <ElButton type="primary" @click="handleLogin">Login</ElButton>
        </ElFormItem>
      </ElForm>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ElFormItem } from 'element-plus'
import { useLogin } from '~/composables/api/modules/user'
import { useSiteStore } from '~/store/site'

const siteStore = useSiteStore()

const form = ref({
  username: '',
  password: '',
})

const { loginSubmit } = useLogin()
const handleLogin = async () => {
  const { status, data } = await loginSubmit(form.value)

  if (status === 200) {
    siteStore.setToken(data)

    navigateTo('/demo/account')
  }
}
</script>
