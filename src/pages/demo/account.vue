<template>
  <div>
    <h3>Account Page</h3>

    <p>{{ userInfo }}</p>
  </div>
</template>

<script setup lang="ts">
import { useUserInfo } from '~/composables/api/modules/user'

const { fetchUserInfo } = useUserInfo()

const userInfo = ref<any>({})

onMounted(async () => {
  const { status, data } = await fetchUserInfo()

  if (status === 200) {
    userInfo.value = data
  }
})
</script>
