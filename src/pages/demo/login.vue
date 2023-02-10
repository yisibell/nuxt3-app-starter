<template>
  <div>
    <h3>Login Page</h3>

    <div>
      <label for="username">User name:</label>
      <input id="username" v-model="form.username" type="text" />
    </div>

    <div>
      <label for="password">Password:</label>
      <input id="password" v-model="form.password" type="password" />
    </div>

    <div>
      <button type="button" @click="handleLogin">Login</button>
    </div>
  </div>
</template>

<script setup lang="ts">
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
